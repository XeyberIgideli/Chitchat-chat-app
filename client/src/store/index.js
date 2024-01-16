import { configureStore } from "@reduxjs/toolkit"
import auth from "./authSlice"
import inputHeight from './inputSlice'
const store = configureStore({
    reducer: {
        auth,
        inputHeight
    }
})

export default store