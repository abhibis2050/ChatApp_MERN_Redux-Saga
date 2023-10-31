import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  myBlogs: [],
  contactBlogs: [],
  singleContactBlogs: [],
  selectedBlogForAction: null,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addBlog: (state, action) => {
      state.myBlogs = [...state.myBlogs, action.payload.myBlogs];
    },
    setMyBlogs: (state, action) => {
      state.myBlogs = action.payload.myBlogs;
    },
    setAllContactBlogs: (state, action) => {
      state.contactBlogs = action.payload.contactBlogs;
    },
    setSingleContactBlogs: (state, action) => {
      state.singleContactBlogs = action.payload.singleContactBlogs;
    },
    setSelectBlogForAction: (state, action) => {
      state.selectedBlogForAction = action.payload.selectedBlogForAction;
    },
    deleteBlog: (state, action) => {
      console.log(action.payload);
      state.myBlogs = state.myBlogs.filter((blog) => {
        return(
          blog._id.toString() !== action.payload.deleteBlog?._id.toString()
        )
      });
    },
  },
});

export const {
  addBlog,
  setMyBlogs,
  setAllContactBlogs,
  setSingleContactBlogs,
  setSelectBlogForAction,
  deleteBlog,
} = blogSlice.actions;
export const blogReducer = blogSlice.reducer;
