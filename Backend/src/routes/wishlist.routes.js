import express from 'express';
import { authenticateUser } from '../middleware/auth.middleware.js';
import { addToWishlist, getWishlist, removeFromWishlist } from '../controllers/wishlist.controller.js';

const router = express.Router();

// Add item to wishlist
// @route POST /api/wishlist/add/:productId
router.post("/add/:productId", authenticateUser, addToWishlist);

// Get user's wishlist
// @route GET /api/wishlist
router.get('/', authenticateUser, getWishlist);

// Remove item from wishlist
// @route DELETE /api/wishlist/remove/:productId
router.delete('/remove/:productId', authenticateUser, removeFromWishlist);

export default router;
