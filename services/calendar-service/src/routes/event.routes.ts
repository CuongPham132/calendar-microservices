import { Router } from 'express';
import { createEvent, getEvents } from '../controllers/event.controller';
import { authenticateJWT } from '../config/auth.middleware';

const router = Router();

router.use(authenticateJWT); // Yêu cầu đăng nhập cho toàn bộ route events

router.post('/', createEvent);
router.get('/', getEvents);

export default router;