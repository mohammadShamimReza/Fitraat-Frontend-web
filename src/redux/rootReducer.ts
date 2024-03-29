import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { authSlice } from "./slice/authSlice";

export const reducer = combineReducers({
  auth: authSlice.reducer, // Include userReducer in the combined reducer
  [baseApi.reducerPath]: baseApi.reducer,
});
