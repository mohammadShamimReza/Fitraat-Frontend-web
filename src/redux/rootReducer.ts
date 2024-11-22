import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { authSlice } from "./slice/authSlice";
import { daySlice } from "./slice/daySlice";
import { initialRenderSlice } from "./slice/initialRenderSlice";
import { taskSlice } from "./slice/taskSlice";

export const reducer = combineReducers({
  auth: authSlice.reducer,
  taskSlice: taskSlice.reducer,
  initialRenderSlice: initialRenderSlice.reducer,
  daySlice: daySlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
