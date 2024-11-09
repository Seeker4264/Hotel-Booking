import 'dotenv/config';
import express from 'express';

import userRouter from './controllers/userController';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8080;

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
