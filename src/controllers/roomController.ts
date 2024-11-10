import express from 'express';

import {
  getAllRooms,
  getAllFloorRooms,
  getRoom,
  postRoom,
  updateRoom,
  deleteRoom
} from '../services/roomService';

const router = express.Router();

router.get("/", async(_req, res) => {
  const response = await getAllRooms();
  res.status(200).json(response);
});

router.get("/floor/:floor", async(req, res) => {
  try {
    const response = await getAllFloorRooms(Number(req.params.floor));
    
    res.status(200).json(response);
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;

    res.status(404).send(message);
  }
});

router.get("/:id", async(req, res) => {
  try {
    const response = await getRoom(Number(req.params.id));
    
    res.status(200).json(response);
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;

    res.status(404).send(message);
  }
});

router.post("/", async(req, res) => {
  try {
    const response = await postRoom(req.body);

    res.status(201).send(response);
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;

    res.status(404).send(message);
  }
});

router.put("/:id", async(req, res) => {
  try {
    const response = await updateRoom(req.body, Number(req.params.id));

    res.status(200).send(response);
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;

    res.status(404).send(message);
  }
});

router.delete("/:id", async(req, res) => {
  try {
    const response = await deleteRoom(Number(req.params.id));
  
    res.status(200).send(response);
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;

    res.status(404).send(message);
  }
});

export default router;
