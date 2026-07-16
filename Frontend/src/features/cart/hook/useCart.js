import {addItem, getCart, removeItem} from "../service/cart.api"
import { useDispatch } from "react-redux";
import { addItem as addItemToCart, setItems } from "../state/cart.slice";

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

    return{
        handleaddItem,
        handleGetcart,
        handleRemoveItemApi
    }
}

