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
      console.log(action.payload.groupIcon);
      state.groupIcon = action.payload.groupIcon;
    },
  },
});

export const {
  setAllGroups,
  setSelectedGroupDetails,
  setSelectedGroupChatId,
  setGroupIcon,
} = groupSlice.actions;
export const groupReducer = groupSlice.reducer;
