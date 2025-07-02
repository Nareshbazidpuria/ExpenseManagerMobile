import {configureStore} from '@reduxjs/toolkit';
import {statusBarColor} from './common';

export const store = configureStore({
  reducer: {
    statusBarColor,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
