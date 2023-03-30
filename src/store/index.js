import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';


// import authReducer from './../features/authSlice'
// import { publishApi } from './../services/publishApi';



const store = configureStore({
    reducer: {

    // auth: authReducer,
    // [publishApi.reducerPath]: publishApi.reducer,


   

    devTools: true
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
    //   authApi.middleware,
    //   publishApi.middleware,


    ])
});
setupListeners(store.dispatch);
export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

export default store;
