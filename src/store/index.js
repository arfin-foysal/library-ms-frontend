import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

// Import the generated reducer as `authReducer`
import authReducer from '../features/authSlice'
import { authApi } from '../services/authApi';
import { authorApi } from '../services/authorApi';
import { categoryApi } from './../services/categoryApi';
import { commonApi } from '../services/commonApi';
import { publisherApi } from '../services/publisherApi';
import { vendorApi } from '../services/vendorApi';
import { userApi } from '../services/userApi';
import { bookItemApi } from '../services/bookItemApi';
import { membershipPlanApi } from '../services/membershipPlanApi';
import { itemOrder } from '../services/itemOrder';
import { itemRentApi } from '../services/itemRentApi';




// Combine the generated reducer with the other reducers
const store = configureStore({
  reducer: {

    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [authorApi.reducerPath]: authorApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,
    [publisherApi.reducerPath]: publisherApi.reducer,
    [vendorApi.reducerPath]: vendorApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [bookItemApi.reducerPath]: bookItemApi.reducer,
    [membershipPlanApi.reducerPath]: membershipPlanApi.reducer,
    [itemOrder.reducerPath]: itemOrder.reducer,
    [itemRentApi.reducerPath]: itemRentApi.reducer,

    devTools: true
  },

  // Add the generated middleware to the store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      authorApi.middleware,
      categoryApi.middleware,
      commonApi.middleware,
      publisherApi.middleware,
      vendorApi.middleware,
      userApi.middleware,
      bookItemApi.middleware,
      membershipPlanApi.middleware,
      itemOrder.middleware,
      itemRentApi.middleware,

    ])
});
setupListeners(store.dispatch);
export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

export default store;
