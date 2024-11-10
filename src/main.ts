/* eslint-disable no-undef */
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRouter from './controllers/authController';
import userRouter from './controllers/userController';
import roomRouter from './controllers/roomController';

const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  headers: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8080;

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/rooms", roomRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
