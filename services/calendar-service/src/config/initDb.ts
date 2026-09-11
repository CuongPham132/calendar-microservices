import { pool } from './db';

export const initDb = async () => {
  const queryText = `
    -- 1. Tạo bảng mới nếu chưa có (kèm 2 cột category & color)
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      location VARCHAR(255),
      start_time TIMESTAMP NOT NULL,
      end_time TIMESTAMP NOT NULL,
      rrule VARCHAR(255),
      category VARCHAR(50) DEFAULT 'study',
      color VARCHAR(20) DEFAULT '#3b82f6',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- 2. Tự động bổ sung cột nếu bảng đã tồn tại từ trước trên Docker
    ALTER TABLE events ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'study';
    ALTER TABLE events ADD COLUMN IF NOT EXISTS color VARCHAR(20) DEFAULT '#3b82f6';
    // Bổ sung vào câu lệnh SQL trong initDb.ts
    ALTER TABLE events ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT FALSE;
    ALTER TABLE events ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL;
  `;

  try {
    await pool.query(queryText);
    console.log('Events table & columns initialized successfully');
  } catch (err) {
    console.error('Error creating/updating events table:', err);
  }
};