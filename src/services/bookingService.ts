import 'dotenv/config';
import { ErrorHandler } from "../lib/errorHandler";
import { pool } from "../config/db";

import { booking } from "../models/bookingModel";

export async function getAllBookings() {
  const response = await pool.query(`
    SELECT * FROM public.bookings
  `);

  return response.rows;
};

export async function getBooking(id: number) {
  const response = await pool.query(`
    SELECT * FROM public.bookings
    WHERE booking_id = ${id}
  `);

  if (response.rows.length === 0) throw new ErrorHandler("404 not found", "booking doesn't exist");
  
  return response.rows;
};

export async function postBooking(booking: booking) {
  const userCheck = await pool.query(`
      SELECT * FROM public.users
      WHERE user_id = '${booking.user_id}'
  `);

  if (userCheck.rows.length === 0) throw new ErrorHandler("404 not found", "user doesn't exist");

  const roomCheck = await pool.query(`
    SELECT * FROM public.rooms
    WHERE room_id = '${booking.room_id}'
  `);

  if (roomCheck.rows.length === 0) throw new ErrorHandler("404 not found", "room doesn't exist");

  await pool.query(`
    INSERT INTO public.bookings(user_id, room_id, start_date, end_date)
	  VALUES ('${booking.user_id}', ${booking.room_id}, '${booking.start_date}', '${booking.end_date}');
  `);

  return 'Booking created successfully';
};

export async function updateBooking(booking: booking, id: number) {
  const response = await pool.query(`
    SELECT * FROM public.bookings
    WHERE booking_id = ${id}
  `);

  if (response.rows.length === 0) throw new ErrorHandler("404 not found", "booking doesn't exist");

  const userCheck = await pool.query(`
    SELECT * FROM public.users
    WHERE user_id = '${booking.user_id}'
  `);

  if (userCheck.rows.length === 0) throw new ErrorHandler("404 not found", "user doesn't exist");

  const roomCheck = await pool.query(`
    SELECT * FROM public.rooms
    WHERE room_id = '${booking.room_id}'
  `);

  if (roomCheck.rows.length === 0) throw new ErrorHandler("404 not found", "room doesn't exist");

  await pool.query(`
    UPDATE public.bookings
    SET user_id='${booking.user_id}',
      room_id=${booking.room_id},
      start_date='${booking.start_date}',
      end_date='${booking.end_date}'
    WHERE booking_id = ${id};
  `);
  
  return "Booking updated successfully";
};

export async function deleteBooking(id: number) {
  const response = await pool.query(`
    SELECT * FROM public.bookings
    WHERE booking_id = ${id}
  `);

  if (response.rows.length === 0) throw new ErrorHandler("404 not found", "booking doesn't exist");

  await pool.query(`
    DELETE FROM public.booking
    WHERE booking_id = ${id}
  `);
  
  return "Booking deleted successfully";
};
