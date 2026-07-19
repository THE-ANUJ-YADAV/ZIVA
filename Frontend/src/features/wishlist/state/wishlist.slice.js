import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: [],
    },
    reducers: {
        setWishlistItems: (state, action) => {
            state.items = action.payload;
        },
        addWishlistItem: (state, action) => {
            // payload is an object { product: productId } from backend, or we construct it
            state.items.push(action.payload);
        },
        removeWishlistItem: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter(item => {
                const id = item.product?._id || item.product;
                return id !== productId;
            });
        }
    }
});

export const { setWishlistItems, addWishlistItem, removeWishlistItem } = wishlistSlice.actions;

export default wishlistSlice.reducer;
