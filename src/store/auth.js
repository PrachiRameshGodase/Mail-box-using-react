import { createSlice } from "@reduxjs/toolkit";

const initialAuthState={
    isAuthenticated:false,

}

const authslice=createSlice({
    name:"authentication",
    initialState:initialAuthState,
    reducers:{
        login(state,action){
            state.isAuthenticated=true;
            localStorage.setItem("token",action.payload)
        },
        logout(state){
            state.isAuthenticated=false;
            localStorage.removeItem("token")
        }
    }

})

export const authActions=authslice.actions;
export default authslice.reducer;