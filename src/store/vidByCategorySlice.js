import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchVidByCategory } from "../http/http";

const initialState = { loading: false, error: false, videoData: [] };

export const getVidByCategory = createAsyncThunk(
  "getVidByCategory",
  async (type) => {
    const data = await fetchVidByCategory(type);
    return data;
  },
);

export const vidByCategorySlice = createSlice({
  initialState,
  name: "vidByCategorySlice",
  extraReducers: (builder) => {
    builder
      .addCase(getVidByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVidByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.videoData = action.payload;
      })
      .addCase(getVidByCategory.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
