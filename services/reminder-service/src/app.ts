import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createReminder } from './services/reminder.controller';
import { initReminderWorker } from './workers/reminder.worker';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/reminders/schedule', createReminder);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Reminder Service' });
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  initReminderWorker();
  console.log(`Reminder Service running on port ${PORT}`);
});