import { createSlice } from '@reduxjs/toolkit';

const synth = createSlice({
  name: 'synth',
  initialState: {
    type: 'sawtooth',
  },
  reducers: {
    setType: (state, { payload }) => void (state.type = payload),
  },
});

export const types = ['sine', 'square', 'sawtooth', 'triangle'];

export const { setType } = synth.actions;

export default synth.reducer;
