import { createSlice } from '@reduxjs/toolkit';
import { primary } from '../utils/global';

const initialState = primary;

const statusBarColorSlice = createSlice({
  name: 'statusBarColor',
  initialState,
  reducers: {
    setStatusBarColor: (state, action) => (state = action.payload),
  },
});

export const { setStatusBarColor } = statusBarColorSlice.actions;
export const statusBarColor = statusBarColorSlice.reducer;
