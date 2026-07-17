import {createSlice} from "@reduxjs/toolkit"


const cartSlice = createSlice({

    name: "cart",
    initialState:{
     items: [],   
    },
    reducers:{
        setItems: (state,action) =>{
            state.items = action.payload;
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
            state.items = state.items.filter(item => item._id !== id);
        },
        incrementCartItem: (state, action) => {
            const { productId, variantId } = action.payload

            state.items = state.items.map(item => {
                if (item.product._id === productId && item.variant === variantId) {
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
                    return { ...item, quantity: item.quantity - 1 }
                } else {
                    return item
                }
            })

        }
    }

})

export const {setItems,addItem,updateQuantity,removeItem,incrementCartItem,decrementCartItem} = cartSlice.actions;

export default cartSlice.reducer;