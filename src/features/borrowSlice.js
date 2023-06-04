import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
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
      const itemInBorrow = state.borrow.find(
        (item) => item.id === action.payload.id
      );
      if (itemInBorrow) {
        toast.error("Item already in borrow list");
        // itemInBorrow.item_qty++;
      } else {
        state.borrow.push({ ...action.payload, item_qty: 1 });
        //localStorage.setItem("borrow", JSON.stringify(state.borrow));
      }
    },
    removeItem: (state, action) => {
      const removeBorrow = state.borrow.filter(
        (item) => item.id !== action.payload
      );
      state.borrow = removeBorrow;
    },
    // update return date

    updateReturnDate: (state, action) => {
      const itemInBorrow = state.borrow.find(
        (item) => item.id === action.payload.id
      );
      if (itemInBorrow) {
        itemInBorrow.return_date = action.payload.return_date;
      }
    },

    //clear borrow
    clearBorrow: (state) => {
      state.borrow = [];
    }
  },
});

export const { addBorrow, removeItem,
  updateReturnDate,
  clearBorrow
} = borrowSlice.actions;
export default borrowSlice.reducer;
