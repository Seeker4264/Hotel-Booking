import { pool } from '../config/db';

import { user } from '../models/userModel';

export async function getAllUsers() {
  try {
    const response = await pool.query(`
      SELECT * FROM users
    `);
    return response.rows;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export async function getUser(id: number) {
  try {
    const response = await pool.query(`
      SELECT * FROM users
      WHERE user_id = ${id}
    `);
    return response.rows;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export async function postUser(user: user) {
  try {
    await pool.query(`
      INSERT INTO public.users(first_name, last_name, username, email, gender)
	    VALUES ('${user.first_name}', '${user.last_name}', '${user.username}', '${user.email}', '${user.gender}')
    `);
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

export async function updateUser(user: user, id: number) {
  try {
    await pool.query(`
      UPDATE public.users
      SET first_name = '${user.first_name}',
        last_name = '${user.last_name}',
        username = '${user.username}',
        email = '${user.email}',
        gender = '${user.gender}'
      WHERE user_id = ${id}
    `);
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

export async function deleteUser(id: number) {
  try {
    await pool.query(`
      DELETE FROM public.users
      WHERE user_id = ${id}
    `);
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};
