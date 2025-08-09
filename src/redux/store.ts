import { configureStore } from '@reduxjs/toolkit';
import { statusBarColor } from './common';
import { authUser } from './auth';
import { lastPush } from './push';

export const store = configureStore({
  reducer: {
    statusBarColor,
    authUser,
    lastPush,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
