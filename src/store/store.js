import { configureStore } from "@reduxjs/toolkit";
import CategoriesSlice from "./categoriesSlice";

export const store = configureStore({
  reducer: { categories: CategoriesSlice.reducer },
});
