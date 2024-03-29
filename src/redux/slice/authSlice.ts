import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
  authToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeUserInfo: (state, action) => {
      console.log(state, action);
      state.userInfo = action.payload;
    },
    storeAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
  },
});

export const { storeAuthToken, storeUserInfo } = authSlice.actions;
