import axios from "axios";

const wishlistApiInstance = axios.create({
    baseURL: "/api/wishlist",
    withCredentials: true
});

export const addToWishlistApi = async (productId) => {
    const response = await wishlistApiInstance.post(`/add/${productId}`);
    return response.data;
};

export const getWishlistApi = async () => {
    const response = await wishlistApiInstance.get("/", { withCredentials: true });
    return response.data;
};

export const removeFromWishlistApi = async (productId) => {
    const response = await wishlistApiInstance.delete(`/remove/${productId}`, {
        withCredentials: true
    });
    return response.data;
};
