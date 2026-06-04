import { configureStore } from "@reduxjs/toolkit";
import CategoriesSlice from "./categoriesSlice";
import { vidByCategorySlice } from "./vidByCategory";

export const store = configureStore({
  reducer: {
    categories: CategoriesSlice.reducer,
    getVidByCategory: vidByCategorySlice.reducer,
  },
});
