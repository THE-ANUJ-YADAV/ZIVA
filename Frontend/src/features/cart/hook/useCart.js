import {addItem, getCart, removeItem,incrementCartItemApi,decrementCartItemApi} from "../service/cart.api"
import { useDispatch } from "react-redux";
import { addItem as addItemToCart, setItems,incrementCartItem ,decrementCartItem} from "../state/cart.slice";
import toast from 'react-hot-toast';

export const useCart = ()=>{
    const dispatch = useDispatch();
    
    async function handleaddItem({productId,variantId}) {
        try {
            const data = await addItem({productId,variantId})
            if (data.success) {
                toast.success("Item added to cart successfully!");
                await handleGetcart();
            } else {
                toast.error(data.message || "Failed to add item to cart");
            }
            return data
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add item to cart");
            throw error;
        }
    }

    async function handleGetcart(){
        const data = await getCart();
        dispatch(setItems(data.cart.items))
    }

    async function handleRemoveItemApi(itemId) {
        const data = await removeItem(itemId);
        return data;
    }

    async function handleIncrementCartItem({productId,variantId}){
        const data = await incrementCartItemApi({productId,variantId})
        dispatch(incrementCartItem({productId,variantId}))
    }

    async function handleDecrementCartItem({productId,variantId}){
        const data = await decrementCartItemApi({productId,variantId})
        dispatch(decrementCartItem({productId,variantId}))
    }

    return{
        handleaddItem,
        handleGetcart,
        handleRemoveItemApi,
        handleIncrementCartItem,
        handleDecrementCartItem
    }
}

