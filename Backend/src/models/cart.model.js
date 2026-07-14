import mongoose, { mongo } from "mongoose";
import priceSchema from "./price.schema.js";

const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    items:[
        {
       
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
            require: true
        },
        variant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product.variants'
        },
        quantity: {
            type: Number,
            default: 1
        },
        price:{
            type: priceSchema,
            required: true
        }

   } 
]

})

const cartModel = mongoose.model('cart',cartSchema)

export default cartModel