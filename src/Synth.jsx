import { useState } from 'react';
import Key from './Key';
import { useOscillators } from './oscillator';

import './Synth.css';

const Synth = () => {
  const oscillators = useOscillators()
  const [isMouseDown, setIsMouseDown] = useState(false)
  return (
    <div
      className="keyboard"
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
    >
      {oscillators?.map((oscillator, key) => (
        <Key {...{ oscillator, isMouseDown, key }} />
      ))}
    </div>
  );
}

export default Synth
