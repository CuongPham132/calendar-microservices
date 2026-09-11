import { Router } from 'express';
import { createEvent, getEvents, updateEvent, deleteEvent } from '../controllers/event.controller';
import { authenticateJWT } from '../config/auth.middleware';

const router = Router();

router.get('/', authenticateJWT, getEvents);
router.post('/', authenticateJWT, createEvent);
router.put('/:id', authenticateJWT, updateEvent);
router.delete('/:id', authenticateJWT, deleteEvent);

export default router;