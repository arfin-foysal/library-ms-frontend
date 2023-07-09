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
        toast.error("This book is already in your Cart list");
      } else {
        state.borrow.push({ ...action.payload, item_qty: 1 });
        toast.success("Book added to Cart list 🛒");
      }
    },
    removeItem: (state, action) => {
      const removeBorrow = state.borrow.filter(
        (item) => item.id !== action.payload
      );

      state.borrow = removeBorrow;
    },

    returnDate: (state, action) => {
      const returnDate = state.borrow.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            return_date: action.payload.return_date,
          };
        }
        return item;
      });
      state.borrow = returnDate;
     
    },
    

    //clear borrow
    clearBorrow: (state) => {
      state.borrow = [];
    },
  },
});

export const { addBorrow, removeItem, clearBorrow,
  returnDate
} = borrowSlice.actions;
export default borrowSlice.reducer;
