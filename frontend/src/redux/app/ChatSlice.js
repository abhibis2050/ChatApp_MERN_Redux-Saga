import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
   allChats:[],
   oppositeChatUser:{}
    
}

export const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
      setAllChats:(state,action)=>{
        state.allChats=action.payload.allChats
      },
      setOppositeChatUser:(state,action)=>{
        state.oppositeChatUser=action.payload.oppositeChatUser
      }
    }
})


export const {setAllChats,setOppositeChatUser} = chatSlice.actions
export const chatReducer = chatSlice.reducer