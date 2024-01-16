import { createSlice } from "@reduxjs/toolkit" 

const initialState = {
    user: JSON.parse(localStorage.getItem('accessToken')) || false
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {  
            if(action.payload) { 
                localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken)) 
            } else {
                localStorage.removeItem('accessToken')
            }
            state.user = action.payload
        }
    }
}) 


export const {setUser} = auth.actions
export default auth.reducer