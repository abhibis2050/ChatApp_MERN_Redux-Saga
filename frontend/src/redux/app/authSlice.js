import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  authUser: {},
  authUserLoading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload.authUser;
    },
    setAuthUserLoading: (state, action) => {
      state.authUserLoading = action.payload.authUserLoading;
    },
  },
});

export const {setToken,setAuthUser,setAuthUserLoading} = authSlice.actions;
export const authReducer = authSlice.reducer;
