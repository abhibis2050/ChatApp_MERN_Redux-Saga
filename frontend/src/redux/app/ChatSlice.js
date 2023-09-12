import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
   allChats:[],
   oppositeChatUser:{},
   selectedSingleChat:undefined
    
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
      },
      setSelectedChat:(state,action)=>{
        state.selectedSingleChat=action.payload.selectedSingleChat
      }
    }
})


export const {setAllChats,setOppositeChatUser,setSelectedChat} = chatSlice.actions
export const chatReducer = chatSlice.reducer