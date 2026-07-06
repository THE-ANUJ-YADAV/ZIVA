import { createProduct,getSellerProduct } from "../services/product.api";
import { useDispatch } from "react-redux";
import { setSellerProducts } from "../state/product.slice";

export const useProduct = () =>{
    const dispatch = useDispatch()

    async function handleCreateproduct(formData){
        const data = await createProduct(formData)
        return data.product
    }

    async function handleGetSellerProduct(){
        const data = await getSellerProduct()
        dispatch(setSellerProducts(data.products))
        return data.products
    }

    return {
        handleCreateproduct,
        handleGetSellerProduct
    }

}