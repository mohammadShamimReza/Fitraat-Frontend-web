import { Meta, Post, PostData } from "@/types/contantType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FeedState {
  data: Post[] | null; // Stores the list of feeds
  meta: Meta | null; // Stores pagination metadata
  currentFeed: Post | null; // Stores the current selected feed
}

const initialState: FeedState = {
  data: null,
  meta: null,
  currentFeed: null,
};

export const feedSlice = createSlice({
  name: "feedSlice",
  initialState,
  reducers: {
    // Store the full feed data
    storeFeedData: (state, action: PayloadAction<PostData>) => {
      state.data = action.payload.data;
      state.meta = action.payload.meta;
    },
    // Store a specific current feed
    storeCurrentFeed: (state, action: PayloadAction<Post>) => {
      state.currentFeed = action.payload;
    },
    // Clear all stored feed data
    clearFeedData: (state) => {
      state.data = null;
      state.meta = null;
      state.currentFeed = null;
    },
  },
});

export const { storeFeedData, storeCurrentFeed, clearFeedData } =
  feedSlice.actions;

export default feedSlice.reducer;
