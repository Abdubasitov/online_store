import { createSlice } from "@reduxjs/toolkit";


const OnePage = createSlice({
    name:'OneProduct',
    initialState: {
        data: []
    },
    reducers: {
        OneProduct: (state, action) => {
            if (state.data.includes(action.payload)) {
                state.data = state.data.filter((id) => id !== action.payload)
            } else{
                state.data = [...state.data, action.payload]
            }
        }
    }
})


export const {OneProduct} = OnePage.actions
export default OnePage.reducer