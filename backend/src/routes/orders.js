import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  createOrder,
  getOrders,
  updateOrderStatus
} from '../controllers/orders.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, getOrders);
router.put('/:id/status', protect, updateOrderStatus);

export default router;