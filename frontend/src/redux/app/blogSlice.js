import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
   myBlogs:[],
   contactBlogs:[]
    
}

export const blogSlice = createSlice({
    name:"blog",
    initialState,
    reducers:{
      setMyBlogs:(state,action)=>{
        state.myBlogs=action.payload.myBlogs
      },
      setAllContactBlogs:(state,action)=>{
        state.contactBlogs=action.payload.contactBlogs
      },
      
    }
})


export const {setMyBlogs,setAllContactBlogs} = blogSlice.actions
export const blogReducer = blogSlice.reducer