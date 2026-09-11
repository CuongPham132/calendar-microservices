import { Response } from 'express';
import { AuthRequest } from '../config/auth.middleware';
import { pool } from '../config/db';

export const createEvent = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  const { title, description, location, startTime, endTime, rrule } = req.body;

  try {
    const newEvent = await pool.query(
      `INSERT INTO events (user_id, title, description, location, start_time, end_time, rrule)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [userId, title, description, location, startTime, endTime, rrule || null]
    );

    res.status(201).json({ message: 'Tạo sự kiện thành công', event: newEvent.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server khi tạo sự kiện', error });
  }
};

export const getEvents = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;

  try {
    const events = await pool.query(
      'SELECT * FROM events WHERE user_id = $1 ORDER BY start_time ASC',
      [userId]
    );

    res.json({ events: events.rows });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách sự kiện', error });
  }
};