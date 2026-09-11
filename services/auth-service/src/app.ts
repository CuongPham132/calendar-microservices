import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './config/db';
import { initDb } from './config/initDb';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Route API Auth
app.use('/api/auth', authRoutes);

app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'OK', time: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  await initDb();
  console.log(`Auth Service running on port ${PORT}`);
});