import express from "express";

import {
  getAllBookings,
  getBooking,
  postBooking,
  updateBooking,
  deleteBooking
} from "../services/bookingService";

const router = express.Router();

router.get("/", async(_req, res) => {
  const response = await getAllBookings();
  res.status(200).json(response);
});

router.get("/:id", async(req, res) => {
  try {
    const response = await getBooking(Number(req.params.id));
    
    res.status(200).json(response);
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;

    res.status(404).send(message);
  }
});

router.post("/", async(req, res) => {
  try {
    const response = await postBooking(req.body);

    res.status(201).send(response);
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;

    res.status(404).send(message);
  }
});

router.put("/:id", async(req, res) => {
  try {
    const response = await updateBooking(req.body, Number(req.params.id));

    res.status(200).send(response);
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;

    res.status(404).send(message);
  }
});

router.delete("/:id", async(req, res) => {
  try {
    const response = await deleteBooking(Number(req.params.id));
  
    res.status(200).send(response);
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;

    res.status(404).send(message);
  }
});

export default router;
