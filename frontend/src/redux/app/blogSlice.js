import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
   myBlogs:[],
   contactBlogs:[],
   singleContactBlogs:[]
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
      setSingleContactBlogs: (state, action) => {
        state.singleContactBlogs = action.payload.singleContactBlogs;
      },
    }
})


export const {setMyBlogs,setAllContactBlogs,setSingleContactBlogs} = blogSlice.actions
export const blogReducer = blogSlice.reducer