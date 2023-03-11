import Key from './Key';
import { notes } from './oscillator';

import './Keyboard.css';

const Keyboard = () => {
  return (
    <div className="keyboard">
      { notes.map(note => (
        <Key note={note} key={note} />
      )) }
    </div>
  );
}

export default Keyboard
