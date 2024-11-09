import express from 'express';

import {
  getAllUsers,
  getUser,
  postUser,
  updateUser,
  deleteUser
} from '../services/userService';

const router = express.Router();

router.get("/", async (_req, res) => {
  const users = await getAllUsers();
  res.status(200).json(users);
});

router.get("/:id", async (req, res) => {
  const user = await getUser(Number(req.params.id));
  res.status(200).json(user);
});

router.post("/", (req, res) => {
  postUser(req.body);
  res.status(201).json({
    message: "User created successfully"
  });
});

router.put("/:id", (req, res) => {
  updateUser(req.body, Number(req.params.id));
  res.status(200).json({
    message: "User updated successfully"
  });
});

router.delete("/:id", (req, res) => {
  deleteUser(Number(req.params.id));
  res.status(200).json({
    message: "User deleted successfully"
  });
});

export default router;
