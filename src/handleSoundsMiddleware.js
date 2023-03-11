import noteToFrequency from 'note-to-frequency';

import { press, release } from './reducers/key';
import { createOscillator } from './oscillator'

const handleSoundsMiddleware = store => {
  const notesPlaying = {};
  return next => ({ type, payload: note }) => {
    if (type === press.type && !notesPlaying[note]) {
      notesPlaying[note] = createOscillator(noteToFrequency(note));
      notesPlaying[note].start();
    } else if (type === release.type) {
      notesPlaying[note].stop();
      delete notesPlaying[note];
    }
  }
}

export default handleSoundsMiddleware;
