import { Worker } from 'bullmq';
import { redisConnection } from '../config/redis';

export const initReminderWorker = () => {
  const worker = new Worker(
    'event-reminders',
    async (job) => {
      const { eventId, userId, title, startTime } = job.data;
      
      console.log(`--------------------------------------------------`);
      console.log(`🔔 [NOTIFICATION TRIGGERED] User #${userId}`);
      console.log(`📌 Sự kiện: ${title}`);
      console.log(`⏰ Thời gian diễn ra: ${startTime}`);
      console.log(`--------------------------------------------------`);

      // TODO: Tích hợp Firebase FCM Push Notification hoặc Email Service tại đây
    },
    { connection: redisConnection }
  );

  worker.on('completed', (job) => {
    console.log(`[Worker] Job #${job.id} gửi thông báo thành công.`);
  });

  worker.on('failed', (job, err) => {
    console.error(`[Worker] Job #${job?.id} bị lỗi:`, err);
  });
};