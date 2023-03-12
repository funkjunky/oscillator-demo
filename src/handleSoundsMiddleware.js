import noteToFrequency from 'note-to-frequency';

import { press, release } from './reducers/notePressed';
import { createOscillator } from './oscillator'

const handleSoundsMiddleware = store => {
  const notesPlaying = {};
  return next => ({ type, payload: note }) => {
    if (type === press.type && !notesPlaying[note]) {
      const { type, octave } = store.getState().synth;
      const octavedNote = note[0] + (+note[1] + octave - 3)
      console.log('note info: ', note, octavedNote, noteToFrequency(octavedNote), store.getState().synth)
      notesPlaying[note] = createOscillator(noteToFrequency(octavedNote), type);
      notesPlaying[note].start();
    } else if (type === release.type) {
      notesPlaying[note].stop();
      delete notesPlaying[note];
    }

    return next({ type, payload: note });
  }
}

export default handleSoundsMiddleware;
