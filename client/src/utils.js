import store from "./store"
import { setUser } from "./store/authSlice"
import { setHeight } from "store/inputSlice";

export function userHandle (data) {
    store.dispatch(setUser(data))
}

export function setInputHeight (height) {
    store.dispatch(setHeight(height))
}