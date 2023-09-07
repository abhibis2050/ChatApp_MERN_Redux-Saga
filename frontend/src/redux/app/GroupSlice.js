import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
   allGroups:[],
   groupDetailsById:{},
   selectedGroupChatId:""
    
}

export const groupSlice = createSlice({
    name:"group",
    initialState,
    reducers:{
      setAllGroups:(state,action)=>{
        state.allGroups=action.payload.allGroups
      },
      setAllGroupDetailsById:(state,action)=>{
        state.groupDetailsById=action.payload.groupDetailsById
      },
      setSelectedGroupChatId:(state,action)=>{
        state.selectedGroupChatId=action.payload.selectedGroupChatId
      }
    }
})



export const {setAllGroups,setAllGroupDetailsById,setSelectedGroupChatId} = groupSlice.actions
export const groupReducer = groupSlice.reducer