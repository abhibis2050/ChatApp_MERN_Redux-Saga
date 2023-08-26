import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
   allSingleChatMessages:[]
    
}

export const messageSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
      setAllSingleChatMessages:(state,action)=>{
        state.allSingleChatMessages=action.payload.allSingleChatMessages
      }
    }
})


export const {setAllSingleChatMessages} = messageSlice.actions
export const messageReducer = messageSlice.reducer