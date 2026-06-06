import { configureStore } from "@reduxjs/toolkit";
import CategoriesSlice from "./categoriesSlice";
import { vidByCategorySlice } from "./vidByCategorySlice";
import { typeOfVidSlice } from "./typeOfVidSlice";

export const store = configureStore({
  reducer: {
    categories: CategoriesSlice.reducer,
    getVidByCategory: vidByCategorySlice.reducer,
    typeOfVid: typeOfVidSlice.reducer,
  },
});
