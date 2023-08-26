import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
   allChats:[],
   singleChatUser:{}
    
}

export const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
      setAllChats:(state,action)=>{
        state.allChats=action.payload.allChats
      },
      setSingleChatUser:(state,action)=>{
        state.singleChatUser=action.payload.singleChatUser
      }
    }
})


export const {setAllChats,setSingleChatUser} = chatSlice.actions
export const chatReducer = chatSlice.reducer