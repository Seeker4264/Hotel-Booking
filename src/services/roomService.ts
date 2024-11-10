import { ErrorHandler } from '../lib/errorHandler';
import { pool } from '../config/db';

import { room } from '../models/roomModel';

export async function getAllRooms() {
  const response = await pool.query(`
    SELECT * FROM public.rooms
  `);

  return response.rows;
};

export async function getAllFloorRooms(floor: number) {
  const response = await pool.query(`
    SELECT * FROM public.rooms
    WHERE floor = ${floor}
  `);

  if (response.rows.length === 0) throw new ErrorHandler("404 not found", "room doesn't exist");
  
  return response.rows;
};

export async function getRoom(id: number) {
  const response = await pool.query(`
    SELECT * FROM public.rooms
    WHERE room_id = ${id}
  `);

  if (response.rows.length === 0) throw new ErrorHandler("404 not found", "room doesn't exist");
  
  return response.rows[0];
};

export async function postRoom(room: room) {
  await pool.query(`
    INSERT INTO public.rooms(floor, room_type)
	  VALUES (${room.floor}, '${room.room_type}');
  `);

  return "Room created successfully";
};

export async function updateRoom(room: room, id: number) {
  const response = await pool.query(`
    SELECT * FROM public.rooms
    WHERE room_id = ${id}
  `);

  if (response.rows.length === 0) throw new ErrorHandler("404 not found", "room doesn't exist");

  await pool.query(`
    UPDATE public.rooms
    SET floor=${room.floor},
      room_type='${room.room_type}'
    WHERE room_id = ${id}
  `);
  
  return "Room updated successfully";
};

export async function deleteRoom(id: number) {
  const response = await pool.query(`
    SELECT * FROM public.rooms
    WHERE room_id = ${id}
  `);

  if (response.rows.length === 0) throw new ErrorHandler("404 not found", "room doesn't exist");

  await pool.query(`
    DELETE FROM public.rooms
    WHERE room_id = ${id}
  `);
  
  return "Room deleted successfully";
};
