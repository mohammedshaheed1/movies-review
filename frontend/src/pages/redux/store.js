import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from './features/auth/authSlice'
import { apiSlice } from "./api/apiSlice";
import moviesReducer from '../redux/features/movis/moviesSlice'
const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authReducer,
        movies:moviesReducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})


setupListeners(store.dispatch)
export default store;