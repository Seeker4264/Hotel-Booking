import express from 'express';

import {
  getAllUsers,
  getUser,
  postUser,
  updateUser,
  deleteUser
} from '../services/userService';

const router = express.Router();

router.get("/", async(_req, res) => {
  const response = await getAllUsers();
  res.status(200).json(response);
});

router.get("/:id", async(req, res) => {
  try {
    const response = await getUser(req.params.id);
    
    res.status(200).json(response);
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;

    res.status(404).send(message);
  }
});

router.post("/", async(req, res) => {
  try {
    const response = await postUser(req.body);

    res.status(201).send(response);
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;

    res.status(404).send(message);
  }
});

router.put("/:id", async(req, res) => {
  try {
    const response = await updateUser(req.body, req.params.id);

    res.status(200).send(response);
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;

    res.status(404).send(message);
  }
});

router.delete("/:id", async(req, res) => {
  try {
    const response = await deleteUser(req.params.id);
  
    res.status(200).send(response);
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;

    res.status(404).send(message);
  }
});

export default router;
