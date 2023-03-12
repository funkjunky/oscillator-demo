import { createSlice } from '@reduxjs/toolkit';

const synth = createSlice({
  name: 'synth',
  initialState: {
    type: 'sawtooth',
    octave: 3,
  },
  reducers: {
    setType: (state, { payload }) => void (state.type = payload),
    setOctave: (state, { payload }) => void (state.octave = payload),
  },
});

export const types = ['sine', 'square', 'sawtooth', 'triangle'];
export const octaves = {
  min: 1,
  max: 7,
};

export const { setType, setOctave } = synth.actions;

export default synth.reducer;
