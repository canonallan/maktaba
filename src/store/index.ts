import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import listingReducer from './slices/listingSlice';
import messageReducer from './slices/messageSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: listingReducer,
    messages: messageReducer,
    orders: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;