import 'dotenv/config';
import bcrypt from 'bcrypt';
import { ErrorHandler } from '../lib/errorHandler';
import { pool } from '../config/db';
import { AuthRepository } from '../repositories/authRepository';

import { user } from '../models/userModel';

export async function getAllUsers() {
  const response = await pool.query(`
    SELECT * FROM public.users
  `);

  return response.rows;
};

export async function getUser(id: number) {
  const response = await pool.query(`
    SELECT * FROM public.users
    WHERE user_id = ${id}
  `);

  if (response.rows.length === 0) throw new ErrorHandler("404 not found", "user doesn't exist");
  
  return response.rows[0];
};

export async function postUser(user: user) {
  const auth = await AuthRepository.validate(user);

  if (!auth) throw new ErrorHandler("validation error", "user already exist exist");

  // eslint-disable-next-line no-undef
  const hashedPassword = await bcrypt.hash(user.password, Number(process.env.SALT_ROUNDS));

  await pool.query(`
    INSERT INTO public.users(first_name, last_name, username, email, gender, password)
    VALUES ('${user.first_name}', '${user.last_name}', '${user.username}', '${user.email}', '${user.gender}', '${hashedPassword}')
  `);

  return "User created successfully";
};

export async function updateUser(user: user, id: number) {
  const specUser = await pool.query(`
    SELECT * FROM users
    WHERE user_id = ${id}
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
    WHERE user_id = ${id}
  `);
  
  return "User updated successfully";
};

export async function deleteUser(id: number) {
  const specUser = await pool.query(`
    SELECT * FROM users
    WHERE user_id = ${id}
  `);

  if (specUser.rows.length === 0) throw new ErrorHandler("404 not found", "user doesn't exist");

  await pool.query(`
    DELETE FROM public.users
    WHERE user_id = ${id}
  `);

  return "User deleted successfully";
};
