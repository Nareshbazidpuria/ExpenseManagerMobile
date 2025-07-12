import { configureStore } from '@reduxjs/toolkit';
import { statusBarColor } from './common';
import { authUser } from './auth';

export const store = configureStore({
  reducer: {
    statusBarColor,
    authUser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
