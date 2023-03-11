import { createSlice } from '@reduxjs/toolkit';

const key = createSlice({
  name: 'key',
  initialState: {},
  reducers: {
    press: (state, key) => void (state[key] = true),
    release: (state, key) => void (state[key] = false),
  },
});

export const { press, release } = key.actions;
export default key.reducer;
