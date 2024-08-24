import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAdmin: false,
    loader: true
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userExist: (state, action) => {
            state.user = action.payload;
            state.loader = false
        },
        userNotExist: (state) => {
            state.user = null;
            state.loader = false
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload;
            state.loader = false
        },
    }

})
export const { userExist, userNotExist, setIsAdmin } = authSlice.actions
export default authSlice