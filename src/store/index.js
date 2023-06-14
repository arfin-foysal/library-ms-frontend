import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

// reducers start
import authReducer from "../features/authSlice";
import clientAuthReducer from "../features/clientAuthSlice";
import borrowSlice from "../features/borrowSlice";
// reducers end

// slices start
import { apiSlice } from "./api/apiSlice";

// slices end

// services start

import { authorApi } from "../services/authorApi";
import { categoryApi } from "./../services/categoryApi";
import { commonApi } from "../services/commonApi";
import { publisherApi } from "../services/publisherApi";
import { vendorApi } from "../services/vendorApi";
import { userApi } from "../services/userApi";
import { bookItemApi } from "../services/bookItemApi";
import { membershipPlanApi } from "../services/membershipPlanApi";
import { itemOrder } from "../services/itemOrder";
import { itemRentApi } from "../services/itemRentApi";
import { authApi } from "../services/authApi";
import { apiSliceAdmin } from "./api/apiSliceAdmin";
// services end



// Combine the generated reducer with the other reducers
const store = configureStore({
  reducer: {

    //<---------------- reducers start -------------->
    auth: authReducer,
    clientAuth: clientAuthReducer,
    borrow: borrowSlice,
    //<----------------- reducers end ------------->
    //<--------------- slices start --------------->
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiSliceAdmin.reducerPath]: apiSliceAdmin.reducer,

    //<-----------------slices end  --------------->
    //<-----------------services start --------------->
    // [authApi.reducerPath]: authApi.reducer,
    // [authorApi.reducerPath]: authorApi.reducer,
    // [categoryApi.reducerPath]: categoryApi.reducer,
    // [commonApi.reducerPath]: commonApi.reducer,
    // [publisherApi.reducerPath]: publisherApi.reducer,
    // [vendorApi.reducerPath]: vendorApi.reducer,
    // [userApi.reducerPath]: userApi.reducer,
    // [bookItemApi.reducerPath]: bookItemApi.reducer,
    // [membershipPlanApi.reducerPath]: membershipPlanApi.reducer,
    // [itemOrder.reducerPath]: itemOrder.reducer,
    // [itemRentApi.reducerPath]: itemRentApi.reducer,
    //<------------------ services end ------------------>

    devTools: true,
  },

  // Add the generated middleware to the store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      //<---------------- slices start --------------->
      apiSlice.middleware,
      apiSliceAdmin.middleware,
      //<---------------- slices end --------------->

      //<------------------- services start ----------------->
      // authApi.middleware,
      // authorApi.middleware,
      // categoryApi.middleware,
      // commonApi.middleware,
      // publisherApi.middleware,
      // vendorApi.middleware,
      // userApi.middleware,
      // bookItemApi.middleware,
      // membershipPlanApi.middleware,
      // itemOrder.middleware,
      // itemRentApi.middleware,
      //<------------------ services end ------------------>
    ]),
});
setupListeners(store.dispatch);
export const useSelector = useReduxSelector;
export const useDispatch = () => useReduxDispatch();
export default store;
