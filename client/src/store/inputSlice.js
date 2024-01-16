import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    height: 0
}

const inputHeight = createSlice({
    name:'inputHeight',
    initialState,
    reducers: {
        setHeight: (state,action) => {

            state.height = action.payload
        }
    }
})

export const {setHeight} = inputHeight.actions
export default inputHeight.reducer