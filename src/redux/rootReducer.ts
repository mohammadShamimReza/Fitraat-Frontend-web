import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { authSlice } from "./slice/authSlice";
import { taskSlice } from "./slice/taskSlice";

export const reducer = combineReducers({
  auth: authSlice.reducer,
  taskSlice: taskSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
