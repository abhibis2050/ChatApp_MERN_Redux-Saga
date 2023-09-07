import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  allGroups: [],
  selectedGroupDetails: {},
  selectedGroupChatId: "",
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
  },
});

export const { setAllGroups, setSelectedGroupDetails, setSelectedGroupChatId } =
  groupSlice.actions;
export const groupReducer = groupSlice.reducer;
