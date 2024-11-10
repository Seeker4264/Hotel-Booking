import bcrypt from 'bcrypt';
import { ErrorHandler } from "../lib/errorHandler";
import { pool } from "../config/db";

import { user } from '../models/userModel';

export class AuthRepository {
  static async validate(auth: user) {
    Validation.username(auth.username);
    Validation.password(auth.password);

    const foundUser = await pool.query(`
      SELECT * FROM users
      WHERE username = '${auth.username}'
    `);
    if (foundUser.rows.length !== 0) return false;

    return true;
  };

  static async create(auth: user) {
    Validation.username(auth.username);
    Validation.password(auth.password);

    const foundUser = await pool.query(`
      SELECT * FROM users
      WHERE username = '${auth.username}'
    `);
    if (foundUser.rows.length !== 0) throw new ErrorHandler("validation error", "user already exist");
    
    // eslint-disable-next-line no-undef
    const hashedPassword = await bcrypt.hash(auth.password, Number(process.env.SALT_ROUNDS));

    await pool.query(`
      INSERT INTO public.users(first_name, last_name, username, email, gender, password)
      VALUES ('${auth.first_name}', '${auth.last_name}', '${auth.username}', '${auth.email}', '${auth.gender}', '${hashedPassword}')
    `);
  };

  static async login(auth: user) {
    Validation.username(auth.username);
    Validation.password(auth.password);

    const foundUser = await pool.query(`
      SELECT * FROM users
      WHERE username = '${auth.username}'
    `);
    if (foundUser.rows.length === 0) throw new ErrorHandler("validation error", "user doesn't exist");

    const isValid = bcrypt.compareSync(auth.password, foundUser.rows[0].password);
    if (!isValid) throw new ErrorHandler("validation error", "incorrect user or password");

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password, ...publicUser } = auth;
    
    return publicUser;
  };

  static async logout() {

  };
};

class Validation {
  static username(username: string) {
    if (username.length <= 3) throw new ErrorHandler("validation error", "username must be at least 4 characters long");
  };

  static password(password: string) {
    if (password.length <= 7) throw new ErrorHandler("validation error", "password must be at least 8 characters long");
  };
}
