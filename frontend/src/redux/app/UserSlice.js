import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sideBarIsActive:{
        message:true,
        group:false,
        contact:false,
        notification:false,
        profile:false
    }
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setSideBarIsActive:(state,action)=>{
            console.log(action.payload);
            state.sideBarIsActive = action.payload
        }
    }
})


export const {setSideBarIsActive} = userSlice.actions
export const userReducer = userSlice.reducer