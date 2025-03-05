import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: []
    },
    reducers: {
        addToCart: (state, action) => {
            // we are mutating the state over here that means directly modifying our state
            const quantity = action.payload.quantityValue;
            action.payload.menuCardDetails['quantity'] = quantity;
            state.cartItems.push(action.payload.menuCardDetails);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((carItem) => carItem.id != action.payload.id);
        },
        clearCart: (state, action) => {
            // state.cartItems = []; -> this will not work
            state.cartItems.length = 0;
        },
        updateQuantity: (state, action) => {
            const menuDetails = action.payload.menuCardDetails;
            const quantity = action.payload.quantityValue;
            const index = state.cartItems.findIndex((carItem) => carItem.id == menuDetails.id);
            state.cartItems[index]['quantity'] = quantity;
        }
    }
});

// we have to export 2 things
// 1. reducer
// 2. actions
export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;


