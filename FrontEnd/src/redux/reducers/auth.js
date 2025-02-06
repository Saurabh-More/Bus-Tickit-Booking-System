import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:false,
}
const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setUser:(state,action) => {
            state.user=action.payload;
        }
    }
});

export default authSlice;
export const { setUser } = authSlice.actions;