import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './../ReduxStore/cartSlice';

const appStore = configureStore({
    reducer: {
        cart: cartReducer
    }
});

export default appStore;