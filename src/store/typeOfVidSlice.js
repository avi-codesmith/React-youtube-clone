import { createSlice } from "@reduxjs/toolkit";

export const initialState = { type: "YouYube" };

export const typeOfVidSlice = createSlice({
  name: "typeOfVidSlice",
  initialState,
  reducers: {
    handleType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { handleType } = typeOfVidSlice.actions;
