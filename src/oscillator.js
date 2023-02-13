import { useEffect, useState } from 'react';

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

export const getOscillator = hertz => {
  let oscillator = false;

  return {
    start: () => {
      oscillator = createOscillator(hertz);
      oscillator.start();
    },
    stop: () => {
      oscillator?.stop();
      oscillator = false;
    },
    ended: () => oscillator === false,
    oscillator,
  }
}

export const useOscillators = () => {
  const [oscillators, setOscillators] = useState(null);

  useEffect(() => setOscillators([1,2,3,4,5,6,7,8].map(v => getOscillator(440 + 30 * v))), [setOscillators])

  return oscillators;
}
