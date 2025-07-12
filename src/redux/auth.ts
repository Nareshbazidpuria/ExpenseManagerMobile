import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const auth = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setAuthUser: (state, action) => (state = action.payload),
  },
});

export const { setAuthUser } = auth.actions;
export const authUser = auth.reducer;
