import express from 'express';
import cors from 'cors';
import proxy from 'express-http-proxy';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

// LƯU Ý: Không dùng app.use(express.json()) toàn cục ở Gateway 
// để tránh làm gián đoạn stream body khi proxy dữ liệu.

const AUTH_SERVICE = process.env.AUTH_SERVICE_URL || 'http://localhost:5001';
const CALENDAR_SERVICE = process.env.CALENDAR_SERVICE_URL || 'http://localhost:5002';
const REMINDER_SERVICE = process.env.REMINDER_SERVICE_URL || 'http://localhost:5003';

// Health Check cho Gateway (Cần express.json nếu route này đọc body, ở đây trả về json thuần nên không sao)
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API Gateway is running' });
});

// Routing requests sang Auth Service (port 5001)
app.use('/api/auth', proxy(AUTH_SERVICE, {
  proxyReqPathResolver: (req) => `/api/auth${req.url}`
}));

// Routing requests sang Calendar Service (port 5002)
app.use('/api/events', proxy(CALENDAR_SERVICE, {
  proxyReqPathResolver: (req) => `/api/events${req.url}`
}));

// Routing requests sang Reminder Service (port 5003)
app.use('/api/reminders', proxy(REMINDER_SERVICE, {
  proxyReqPathResolver: (req) => `/api/reminders${req.url}`
}));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
});