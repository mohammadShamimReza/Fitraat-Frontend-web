import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    // Initial state of the user slice
  },
  reducers: {
    // Define reducers for updating user state
  },
});
export const { actions: userActions, reducer: userReducer } = userSlice;
