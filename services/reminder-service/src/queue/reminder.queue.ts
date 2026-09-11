import { Queue } from 'bullmq';
import { redisConnection } from '../config/redis';

export const reminderQueue = new Queue('event-reminders', {
  connection: redisConnection,
});

export const scheduleReminder = async (
  eventId: number,
  userId: number,
  title: string,
  startTime: string,
  remindMinutesBefore: number = 15
) => {
  const eventDate = new Date(startTime).getTime();
  const remindTime = eventDate - remindMinutesBefore * 60 * 1000;
  const delay = remindTime - Date.now();

  if (delay <= 0) {
    console.log(`[Reminder] Sự kiện ${title} đã hoặc sắp diễn ra, bắn thông báo ngay lập tức.`);
  }

  // Thêm Job vào Redis Queue với thời gian hoãn (delay)
  await reminderQueue.add(
    'send-notification',
    { eventId, userId, title, startTime },
    { delay: Math.max(0, delay) }
  );

  console.log(`[Reminder] Đã lên lịch nhắc nhở cho "${title}" sau ${Math.round(Math.max(0, delay) / 1000)}s`);
};