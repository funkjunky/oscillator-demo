import { connect } from 'react-redux';

import Key from './Key';
import { notes } from './oscillator';
import { press, release } from './reducers/notePressed';

import './Keyboard.css';

const Keyboard = ({ notePressed, press, release }) => (
  <fieldset className="keyboard">
    <legend>Keyboard</legend>
    { notes.map(note => (
      <Key pressed={!!notePressed?.[note]} press={() => press(note)} release={() => release(note)} key={note} />
    )) }
    <pre>Notes: {Object.entries(notePressed || {}).filter(([note, pressed]) => pressed).map(([note]) => note)}</pre>
  </fieldset>
);

export default connect(({ notePressed }) => ({ notePressed }), { press, release })(Keyboard);
