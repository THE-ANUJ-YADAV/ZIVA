import express from 'express'
import {authenticateUser} from '../middleware/auth.middleware.js'
import { validateAddToCart } from '../validator/cart.validator.js';
import { addToCart, getCart } from '../controllers/cart.controller.js';

const router = express.Router();

// Add item to cart
// @route Post/api/cart/add/:productId/:variantId
router.post("/add/:productId/:variantId",authenticateUser,validateAddToCart,addToCart)

//Get user's cart
router.get('/',authenticateUser,getCart)


export default router