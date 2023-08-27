import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideBarIsActive: {
    message: true,
    group: false,
    contact: false,
    notification: false,
    profile: false,
  },
  allContacts: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSideBarIsActive: (state, action) => {
      state.sideBarIsActive = action.payload;
    },
    setAllContact: (state, action) => {
      state.allContacts = action.payload.allContacts;
    },
  },
});

export const { setSideBarIsActive,setAllContact } = userSlice.actions;
export const userReducer = userSlice.reducer;
