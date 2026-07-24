import {createSlice} from "@reduxjs/toolkit"


const cartSlice = createSlice({

    name: "cart",
    initialState: {
        totalPrice: null,
        currency: null,
        items: [],
    },
    reducers: {
        setCart:(state,action) =>{
          state.items = action.payload.items;
          state.totalPrice = action.payload.totalPrice;
          state.currency = action.payload.currency;
        },
        addItem: (state,action) => {
            state.items.push(action.payload);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(i => i._id === id);
            if (item) {
                item.quantity = quantity;
            }
        },
        removeItem: (state, action) => {
            const id = action.payload;
            const itemToRemove = state.items.find(item => item._id === id);
            if (itemToRemove) {
                const price = itemToRemove.price?.amount || 0;
                state.totalPrice = Math.max(0, (state.totalPrice || 0) - (price * itemToRemove.quantity));
                state.items = state.items.filter(item => item._id !== id);
            }
        },
        incrementCartItem: (state, action) => {
            const { productId, variantId } = action.payload

            state.items = state.items.map(item => {
                if (item.product._id === productId && item.variant === variantId) {
                    const price = item.price?.amount || 0;
                    state.totalPrice = (state.totalPrice || 0) + price;
                    return { ...item, quantity: item.quantity + 1 }
                } else {
                    return item
                }
            })

        },
        decrementCartItem: (state, action) => {
            const { productId, variantId } = action.payload

            state.items = state.items.map(item => {
                if (item.product._id === productId && item.variant === variantId) {
                    const price = item.price?.amount || 0;
                    state.totalPrice = Math.max(0, (state.totalPrice || 0) - price);
                    return { ...item, quantity: item.quantity - 1 }
                } else {
                    return item
                }
            })

        }
    }

})

export const {addItem,updateQuantity,removeItem,incrementCartItem,decrementCartItem,setCart} = cartSlice.actions;

export default cartSlice.reducer;