import { Response } from 'express';
import { AuthRequest } from '../config/auth.middleware';
import { pool } from '../config/db';

// 1. TẠO SỰ KIỆN MỚI (Thêm category và color)
export const createEvent = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  const { title, description, location, startTime, endTime, rrule, category, color } = req.body;

  try {
    const newEvent = await pool.query(
      `INSERT INTO events (user_id, title, description, location, start_time, end_time, rrule, category, color)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        userId, 
        title, 
        description || null, 
        location || null, 
        startTime, 
        endTime, 
        rrule || null, 
        category || 'study', 
        color || '#3b82f6'
      ]
    );

    res.status(201).json({ message: 'Tạo sự kiện thành công', event: newEvent.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server khi tạo sự kiện', error });
  }
};

// 2. LẤY DANH SÁCH SỰ KIỆN
export const getEvents = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;

  try {
    const events = await pool.query(
      'SELECT * FROM events WHERE user_id = $1 AND is_deleted = FALSE ORDER BY start_time ASC',
      [userId]
    );

    res.json({ events: events.rows });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách sự kiện', error });
  }
};

// 3. CẬP NHẬT SỰ KIỆN (Dùng cho Kéo-Thả / Resize / Sửa thông tin)
export const updateEvent = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  const { id } = req.params;
  const { title, description, location, startTime, endTime, category, color } = req.body;

  try {
    const updatedEvent = await pool.query(
      `UPDATE events 
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           location = COALESCE($3, location),
           start_time = COALESCE($4, start_time),
           end_time = COALESCE($5, end_time),
           category = COALESCE($6, category),
           color = COALESCE($7, color)
       WHERE id = $8 AND user_id = $9
       RETURNING *`,
      [title, description, location, startTime, endTime, category, color, id, userId]
    );

    if (updatedEvent.rowCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy sự kiện hoặc không có quyền sửa' });
    }

    res.json({ message: 'Cập nhật sự kiện thành công', event: updatedEvent.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server khi cập nhật sự kiện', error });
  }
};

// 4. XÓA SỰ KIỆN
export const deleteEvent = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  const { id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE events 
       SET is_deleted = TRUE, deleted_at = CURRENT_TIMESTAMP 
       WHERE id = $1 AND user_id = $2 AND is_deleted = FALSE 
       RETURNING *`,
      [id, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy sự kiện hoặc đã bị xóa' });
    }

    res.json({ message: 'Đã chuyển sự kiện vào thùng rác', id });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server khi xóa sự kiện', error });
  }
};