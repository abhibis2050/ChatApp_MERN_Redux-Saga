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
  allFriendList: [],
  allFriendRequestSent: [],
  allFriendRequestRecieved: [],
  allFriendListId: [],
  allFriendRequestSentId: [],
  allFriendRequestRecievedId: [],
  userIcon:null,
  selectedContact:null
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
    setAllFriendList: (state, action) => {
      state.allFriendList = action.payload.allFriendList;
    },
    setAllFriendRequestSent: (state, action) => {
      state.allFriendRequestSent = action.payload.allFriendRequestSent;
    },
    setAllFriendRequestRecieved: (state, action) => {
      state.allFriendRequestRecieved = action.payload.allFriendRequestRecieved;
    },
    setAllFriendListId: (state, action) => {
      state.allFriendListId = action.payload.allFriendListId;
    },
    setAllFriendRequestSentId: (state, action) => {
      state.allFriendRequestSentId = action.payload.allFriendRequestSentId;
    },
    setAllFriendRequestRecievedId: (state, action) => {
      state.allFriendRequestRecievedId = action.payload.allFriendRequestRecievedId;
    },
    setUserIcon: (state, action) => {
      state.userIcon = action.payload.userIcon;
    },
    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload.selectedContact;
    },
  },
});

export const {
  setSideBarIsActive,
  setAllContact,
  setAllFriendList,
  setAllFriendRequestSent,
  setAllFriendRequestRecieved,
  setAllFriendListId,
  setAllFriendRequestSentId,
  setAllFriendRequestRecievedId,
  setUserIcon
} = userSlice.actions;
export const userReducer = userSlice.reducer;
