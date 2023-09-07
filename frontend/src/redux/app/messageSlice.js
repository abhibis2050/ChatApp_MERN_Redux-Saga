import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
   allSingleChatMessages:[],
   allGroupMessages:[]
    
}

export const messageSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
      setAllSingleChatMessages:(state,action)=>{
        state.allSingleChatMessages=action.payload.allSingleChatMessages
      },
      setAllGroupMessages:(state,action)=>{
        state.allGroupMessages=action.payload.allGroupMessages
      },
      
    }
})


export const {setAllSingleChatMessages,setAllGroupMessages} = messageSlice.actions
export const messageReducer = messageSlice.reducer