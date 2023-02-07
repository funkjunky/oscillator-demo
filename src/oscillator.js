import { useState } from 'react'

let audioCtx;

const getAudioCtx = () => {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  return audioCtx;
}

export const createOscillator = (hertz, type='square') => {
  const oscillator = getAudioCtx().createOscillator();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(hertz, getAudioCtx().currentTime); // value in hertz
  oscillator.connect(getAudioCtx().destination);

  return oscillator
}

export const useOscillator = hertz => {
  const [oscillator, setOscillator] = useState(null);

  return {
    start: () => {
      const _o = createOscillator(hertz);
      _o.start();
      setOscillator(_o);
    },
    stop: () => {
      oscillator?.stop();
      setOscillator(null);
    },
    ended: () => oscillator === null,
  }
}
