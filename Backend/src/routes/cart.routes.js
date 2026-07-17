import express from 'express'
import {authenticateUser} from '../middleware/auth.middleware.js'
import { validateAddToCart,validateIncrementCartItemQuantity,validateDecrementCartItemQuantity } from '../validator/cart.validator.js';
import { addToCart, getCart, removeFromCart , incrementCartItemQuantity,decrementCartItemQuantity} from '../controllers/cart.controller.js';

const router = express.Router();

// Add item to cart
// @route Post/api/cart/add/:productId/:variantId
router.post("/add/:productId/:variantId",authenticateUser,validateAddToCart,addToCart)

//Get user's cart
router.get('/',authenticateUser,getCart)

// Remove item from cart
router.delete('/remove/:itemId', authenticateUser, removeFromCart)

// increment item quantity in cart
router.patch("/quantity/increment/:productId/:variantId",authenticateUser,incrementCartItemQuantity,validateIncrementCartItemQuantity)

// decrement item quantity in cart
router.patch("/quantity/decrement/:productId/:variantId",authenticateUser,decrementCartItemQuantity,validateDecrementCartItemQuantity)

export default router