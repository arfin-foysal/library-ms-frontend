import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';


import authReducer from '../features/authSlice'
import { authApi } from '../services/authApi';
import { authorApi } from '../services/authorApi';




const store = configureStore({
    reducer: {

    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [authorApi.reducerPath]: authorApi.reducer,



   

    devTools: true
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      authorApi.middleware,
 


    ])
});
setupListeners(store.dispatch);
export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

export default store;
