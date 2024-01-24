// store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { expenseReducer } from './reducer';
import { getCategoriesQuery, deleteCategory, apiSlice } from '../store/apislice';

export const store = configureStore({
  reducer: {
    expense: expenseReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
