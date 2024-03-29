import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { userReducer } from "./slice/userSlice";

export const reducer = combineReducers({
  user: userReducer, // Include userReducer in the combined reducer
  [baseApi.reducerPath]: baseApi.reducer,
});
