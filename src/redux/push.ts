import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const push = createSlice({
  name: 'lastPush',
  initialState,
  reducers: {
    setLastPush: (state, action) => (state = action.payload),
  },
});

export const { setLastPush } = push.actions;
export const lastPush = push.reducer;
