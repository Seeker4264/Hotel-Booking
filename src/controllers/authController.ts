import 'dotenv/config';
import bcrypt from 'bcrypt';
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
  
    // eslint-disable-next-line no-undef
    const hashedPassword = await bcrypt.hash(user.password, Number(process.env.SALT_ROUNDS));
  
    await pool.query(`
      INSERT INTO public.users(first_name, last_name, username, email, gender, password)
      VALUES ('${user.first_name}', '${user.last_name}', '${user.username}', '${user.email}', '${user.gender}', '${hashedPassword}')
    `);
  
    res.status(201).send("User registered successfully");
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;

    res.status(404).send(message);
  }
});

router.post("/login", async(req, res) => {
  try {
    const user = req.body;
    const auth = await AuthRepository.login(user);

    res.status(200).send(auth);
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;

    res.status(401).send(message);
  }
});

router.post("/logout", async(_req, res) => {
  res.send("TBH");
});

export default router;
