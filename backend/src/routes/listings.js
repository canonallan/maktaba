import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  createListing,
  getListings,
  getListing,
  updateListing,
  deleteListing
} from '../controllers/listings.js';

const router = express.Router();

router.post('/', protect, createListing);
router.get('/', getListings);
router.get('/:id', getListing);
router.put('/:id', protect, updateListing);
router.delete('/:id', protect, deleteListing);

export default router;