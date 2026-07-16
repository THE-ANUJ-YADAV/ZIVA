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
    }

})

export const {setItems,addItem,updateQuantity,removeItem} = cartSlice.actions;

export default cartSlice.reducer;