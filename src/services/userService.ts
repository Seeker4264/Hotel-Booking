import 'dotenv/config';
import bcrypt from 'bcrypt';
import { ErrorHandler } from '../lib/errorHandler';
import { pool } from '../config/db';
import { AuthRepository } from '../repositories/authRepository';
import crypto from 'node:crypto';

import { user } from '../models/userModel';

export async function getAllUsers() {
  const response = await pool.query(`
    SELECT * FROM public.users
  `);

  const result = [];

  for (let i = 0; i < response.rows.length; i++) {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password, ...publicUser } = response.rows[i];
    result.push(publicUser);
  };

  return result;
};

export async function getUser(id: string) {
  const response = await pool.query(`
    SELECT * FROM public.users
    WHERE user_id = '${id}'
  `);

  if (response.rows.length === 0) throw new ErrorHandler("404 not found", "user doesn't exist");

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...user } = response.rows[0];
  
  return user;
};

export async function postUser(user: user) {
  const auth = await AuthRepository.validate(user);

  if (!auth) throw new ErrorHandler("validation error", "user already exist exist");

  const user_id = crypto.randomUUID();
  // eslint-disable-next-line no-undef
  const hashedPassword = await bcrypt.hash(user.password, Number(process.env.SALT_ROUNDS));

  await pool.query(`
    INSERT INTO public.users(user_id, first_name, last_name, username, email, gender, password)
    VALUES ('${user_id}', '${user.first_name}', '${user.last_name}', '${user.username}', '${user.email}', '${user.gender}', '${hashedPassword}')
  `);

  return "User created successfully";
};

export async function updateUser(user: user, id: string) {
  const specUser = await pool.query(`
    SELECT * FROM users
    WHERE user_id = '${id}'
  `);

  if (specUser.rows.length === 0) throw new ErrorHandler("404 not found", "user doesn't exist");

  await pool.query(`
    UPDATE public.users
    SET first_name = '${user.first_name}',
      last_name = '${user.last_name}',
      username = '${user.username}',
      email = '${user.email}',
      gender = '${user.gender}',
      password = '${user.password}'
    WHERE user_id = '${id}'
  `);
  
  return "User updated successfully";
};

export async function deleteUser(id: string) {
  const specUser = await pool.query(`
    SELECT * FROM users
    WHERE user_id = '${id}'
  `);

  if (specUser.rows.length === 0) throw new ErrorHandler("404 not found", "user doesn't exist");

  await pool.query(`
    DELETE FROM public.users
    WHERE user_id = '${id}'
  `);

  return "User deleted successfully";
};
