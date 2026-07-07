import express from 'express'
import { authenticateSeller } from '../middleware/auth.middleware.js'
import { createProduct, getAllproducts, getSellerProducts } from '../controllers/product.controller.js'
import multer from 'multer'
import { createProductValidator } from '../validator/product.validator.js'

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 
    }
})

const router = express.Router()

//Create new Products
router.post("/",authenticateSeller,upload.array('images',7),createProduct,createProductValidator)

// Get all products
router.get("/seller",authenticateSeller,getSellerProducts)

// Get /api/products
router.get("/",getAllproducts)


export default router