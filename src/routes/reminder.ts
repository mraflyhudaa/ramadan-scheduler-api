import { Router } from 'express';
import { createReminder, getUserReminders, updateReminder, deleteReminder } from '../controllers/reminder';

const router = Router();

router.post('/', createReminder);
router.get('/user/:userId', getUserReminders);
router.put('/:id', updateReminder);
router.delete('/:id', deleteReminder);

export default router;