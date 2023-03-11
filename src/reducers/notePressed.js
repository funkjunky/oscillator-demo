import { createSlice } from '@reduxjs/toolkit';

const notePressed = createSlice({
  name: 'notePressed',
  initialState: {},
  reducers: {
    press: (state, { payload: notePressed }) => void (state[notePressed] = true),
    release: (state, { payload: notePressed }) => void (state[notePressed] = false),
  },
});

export const { press, release } = notePressed.actions;
export default notePressed.reducer;
