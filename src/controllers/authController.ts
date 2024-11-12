/* eslint-disable no-undef */
import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from 'express';

import { ErrorHandler } from '../lib/errorHandler';
import { pool } from '../config/db';
import { AuthRepository } from '../repositories/authRepository';

//import { user } from '../models/userModel';

const router = express.Router();

router.post("/register", async(req, res) => {
  try {
    const user = req.body;
    const auth = await AuthRepository.validate(user);
  
    if (!auth) throw new ErrorHandler("validation error", "user already exist exist");
  
    const hashedPassword = await bcrypt.hash(user.password, Number(process.env.SALT_ROUNDS));
  
    await pool.query(`
      INSERT INTO public.users(first_name, last_name, username, email, gender, password)
      VALUES ('${user.first_name}', '${user.last_name}', '${user.username}', '${user.email}', '${user.gender}', '${hashedPassword}')
    `);
  
    res.status(201).send("User registered successfully");
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;

    res.status(409).send(message);
  }
});

router.post("/login", async(req, res) => {
  try {
    const user = req.body;
    const auth = await AuthRepository.login(user);

    const token = jwt.sign(auth, String(process.env.JWT_SECRET), {
      expiresIn: "1h"
    });

    res.cookie('access_token', token, {
      httpOnly: true, // only accessible from the server
      maxAge: 1000 * 60 * 60,
    });
    res.status(200).send({ auth, token });
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;

    res.status(401).send(message);
  }
});

router.post("/logout", async(_req, res) => {
  res.clearCookie("access_token").send("Logged out successfully");
});

router.get("/protected", async(req, res) => {
  try {
    const token = req.cookies.access_token;
  
    if (!token) throw new ErrorHandler("Auth error", "access denied");
  
    const data = jwt.verify(token, String(process.env.JWT_SECRET));
    
    res.status(200).send({ message: "Access granted", data });
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;

    res.status(401).send(message);
  }
});

export default router;
