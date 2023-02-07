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
  let oscillator = null;

  return {
    start: () => {
      oscillator = createOscillator(hertz);
      oscillator.start();
    },
    stop: () => {
      oscillator?.stop();
      oscillator = null;
    },
    ended: () => oscillator === null,
  }
}
