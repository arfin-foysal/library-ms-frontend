import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

const initialState = {
  borrow: [],
};
export const borrowSlice = createSlice({
  name: "borrow",
  initialState,
  reducers: {
    // add borrow

    addBorrow: (state, action) => {
      const itemInCart = state.borrow.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        toast.error("This book is already in your borrow list");
      } else {
        state.borrow.push({ ...action.payload, item_qty: 1 });
        toast("Book added to borrow list 🛒");
      }
    },
    removeItem: (state, action) => {
      const removeBorrow = state.borrow.filter(
        (item) => item.id !== action.payload
      );

      state.borrow = removeBorrow;
    },

    //clear borrow
    clearBorrow: (state) => {
      state.borrow = [];
    },
  },
});

export const { addBorrow, removeItem, clearBorrow } = borrowSlice.actions;
export default borrowSlice.reducer;
