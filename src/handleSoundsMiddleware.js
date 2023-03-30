import noteToFrequency from 'note-to-frequency';

import { press, release } from './reducers/notePressed';
import { createOscillator, getAudioCtx } from './oscillator'

const handleSoundsMiddleware = store => {
  const notesPlaying = {};
  const gainNodes = {};
  return next => ({ type, payload: note }) => {
    if (type === press.type && !notesPlaying[note]) {
      const { type, octave, offset, attack } = store.getState().synth;
      const octavedNote = note[0] + (+note[1] + octave - 3);
      const frequency = noteToFrequency(octavedNote);
      const offsetFreq = frequency + offset;
      console.log('note info: ', note, octavedNote, offsetFreq, getAudioCtx().currentTime, store.getState().synth)
      notesPlaying[note] = createOscillator(offsetFreq, type);

      gainNodes[note] = getAudioCtx().createGain();
      gainNodes[note].gain.cancelScheduledValues(getAudioCtx().currentTime);
      gainNodes[note].gain.setValueAtTime(0, getAudioCtx().currentTime);
      gainNodes[note].gain.linearRampToValueAtTime(1, getAudioCtx().currentTime + attack / 80); // 1 attack = 1/10th of a second

      notesPlaying[note].connect(gainNodes[note]).connect(getAudioCtx().destination);

      notesPlaying[note].start();
    } else if (type === release.type) {
      const { release } = store.getState().synth;
      gainNodes[note].gain.cancelScheduledValues(getAudioCtx().currentTime);
      gainNodes[note].gain.linearRampToValueAtTime(0, getAudioCtx().currentTime + 1 - release / 80);
      // 1 release = 1/10th of a second
      notesPlaying[note].connect(gainNodes[note]);
      notesPlaying[note].stop(getAudioCtx().currentTime + 1 - release / 80);
      delete notesPlaying[note];
    }

    return next({ type, payload: note });
  }
}

export default handleSoundsMiddleware;
