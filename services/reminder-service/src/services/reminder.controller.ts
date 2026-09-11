import { Request, Response } from 'express';
import { scheduleReminder } from '../queue/reminder.queue';

export const createReminder = async (req: Request, res: Response) => {
  const { eventId, userId, title, startTime, remindMinutesBefore } = req.body;

  try {
    await scheduleReminder(eventId, userId, title, startTime, remindMinutesBefore);
    res.status(200).json({ message: 'Đã lên lịch nhắc nhở thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi đặt lịch thông báo', error });
  }
};