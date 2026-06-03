import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../http/http";

const initialState = { loading: false, error: false, categoriesData: [] };

export const getCategories = createAsyncThunk("getCategories", async () => {
  const data = await fetchCategories();
  return data;
});

const CategoriesSlice = createSlice({
  name: "categorySlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categoriesData = action.payload;
      })
      .addCase(getCategories.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default CategoriesSlice;
