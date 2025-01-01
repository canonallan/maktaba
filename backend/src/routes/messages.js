import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  sendMessage,
  getConversations,
  getMessages
} from '../controllers/messages.js';

const router = express.Router();

router.post('/', protect, sendMessage);
router.get('/conversations', protect, getConversations);
router.get('/:userId', protect, getMessages);

export default router;