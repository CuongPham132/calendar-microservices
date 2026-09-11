import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

export const redisConnection = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  maxRetriesPerRequest: null, // Bắt buộc cho BullMQ
});

redisConnection.on('connect', () => {
  console.log('Connected to Redis (Reminder Queue)');
});