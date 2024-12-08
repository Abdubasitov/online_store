import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
    name: 'carts',
    initialState: {
        data: []
    },
    reducers: {
        addCart: (state, action) => {
            const itemId = action.payload;
            // Check if item already exists in cart
            const existingItem = state.data.find(item => item.id === itemId);
            if (existingItem) {
                existingItem.count += 1; // Increment count if the item is already in the cart
            } else {
                state.data.push({ id: itemId, count: 1 }); // Add new item to the cart
            }
        },
        removeCart: (state, action) => {
            const itemId = action.payload;
            const existingItem = state.data.find(item => item.id === itemId);
            if (existingItem) {
                if (existingItem.count > 1) {
                    existingItem.count -= 1; // Decrement count if more than 1
                } else {
                    state.data = state.data.filter(item => item.id !== itemId); // Remove item if count is 1
                }
            }
        },
        clearCart(state) {
            state.data = [];  // Очистка корзины
        },
        deleteCartItem(state, action) {
            return {
                ...state,
                data: state.data.filter(item => item.id !== action.payload)
            };
        }

    }
});

export const { addCart, removeCart, clearCart,deleteCartItem } = cart.actions;
export default cart.reducer;