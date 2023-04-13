import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';


import authReducer from '../features/authSlice'
import { authApi } from '../services/authApi';
import { authorApi } from '../services/authorApi';
import { categoryApi } from './../services/categoryApi';
import { commonApi } from '../services/commonApi';
import { publisherApi } from '../services/publisherApi';




const store = configureStore({
  reducer: {

    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [authorApi.reducerPath]: authorApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,
    [publisherApi.reducerPath]: publisherApi.reducer,



   

    devTools: true
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      authorApi.middleware,
      categoryApi.middleware,
      commonApi.middleware,
      publisherApi.middleware,
 


    ])
});
setupListeners(store.dispatch);
export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

export default store;
