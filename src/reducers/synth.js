import { createSlice } from '@reduxjs/toolkit';

const synth = createSlice({
  name: 'synth',
  initialState: {
    type: 'sawtooth',
    octave: 3,
    offset: 0,
    attack: 10,
    release: 70,
  },
  reducers: {
    setType: (state, { payload }) => void (state.type = payload),
    setOctave: (state, { payload }) => void (state.octave = payload),
    setOffset: (state, { payload }) => void (state.offset = payload),
    setAttack: (state, { payload }) => void (state.attack = payload),
    setRelease: (state, { payload }) => void (state.release = payload),
  },
});

export const types = ['sine', 'square', 'sawtooth', 'triangle'];
export const octaves = {
  min: 1,
  max: 7,
};
export const offset = {
  min: -10,
  max: 10,
}

export const { setType, setOctave, setOffset, setAttack, setRelease } = synth.actions;

export default synth.reducer;
