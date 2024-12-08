import { createSlice } from "@reduxjs/toolkit";


const favorites = createSlice({
    name:'favorites',
    initialState: {
        data: []
    },
    reducers: {
        toggleFavorites: (state, action) => {
            if (state.data.includes(action.payload)) {
                state.data = state.data.filter((id) => id !== action.payload)
            } else{
                state.data = [...state.data, action.payload]
            }
        }
    }
})


export const {toggleFavorites} = favorites.actions
export default favorites.reducer