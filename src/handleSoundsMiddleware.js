import noteToFrequency from 'note-to-frequency';

import { press, release } from './reducers/notePressed';
import { createOscillator } from './oscillator'

const handleSoundsMiddleware = store => {
  const notesPlaying = {};
  return next => ({ type, payload: note }) => {
    if (type === press.type && !notesPlaying[note]) {
      console.log('note, freq: ', note, noteToFrequency(note), store.getState())
      notesPlaying[note] = createOscillator(noteToFrequency(note), store.getState().synth.type);
      notesPlaying[note].start();
    } else if (type === release.type) {
      notesPlaying[note].stop();
      delete notesPlaying[note];
    }

    return next({ type, payload: note });
  }
}

export default handleSoundsMiddleware;
