import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  allGroups: [],
  selectedGroupDetails: {},
  selectedGroupChatId: "",
  groupIcon:null
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setAllGroups: (state, action) => {
      state.allGroups = action.payload.allGroups;
    },
    setSelectedGroupDetails: (state, action) => {
      state.selectedGroupDetails = action.payload.selectedGroupDetails;
    },
    setSelectedGroupChatId: (state, action) => {
      state.selectedGroupChatId = action.payload.selectedGroupChatId;
    },
    setGroupIcon: (state, action) => {
      state.groupIcon = action.payload.groupIcon;
    },
    setCreateGroup: (state, action) => {
      state.allGroups = [...state.allGroups, action.payload.newGroup];
    },
  },
});

export const {
  setAllGroups,
  setSelectedGroupDetails,
  setSelectedGroupChatId,
  setGroupIcon,
  setCreateGroup
} = groupSlice.actions;
export const groupReducer = groupSlice.reducer;
