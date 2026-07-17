import {addItem, getCart, removeItem,incrementCartItemApi} from "../service/cart.api"
import { useDispatch } from "react-redux";
import { addItem as addItemToCart, setItems,incrementCartItem } from "../state/cart.slice";

export const useCart = ()=>{
    const dispatch = useDispatch();
    
    async function handleaddItem({productId,variantId}) {
        const data = await addItem({productId,variantId})
        return data
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

    return{
        handleaddItem,
        handleGetcart,
        handleRemoveItemApi,
        handleIncrementCartItem
    }
}

