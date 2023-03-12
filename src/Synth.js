import { connect } from 'react-redux';

import Keyboard from './Keyboard';
import { types, octaves, setType, setOctave } from './reducers/synth';

const Synth = ({ synth, setType, setOctave }) => {
  return (
    <fieldset>
      <legend>Synth</legend>
      <div>
        <span>type: 
        <select value={synth?.type} onChange={({ target }) => setType(target.value)}>
            { types.map(type => (
              <option value={type} key={type}>{type}</option>
            )) }
          </select>
        </span>
        <span>Octave:
          <input type="range" min={octaves.min} max={octaves.max} value={synth?.octave} onChange={({ target }) => setOctave(+target.value)} />
        </span>
      </div>
      <Keyboard />
    </fieldset>
  );
};

export default connect(({ synth }) => ({ synth }), { setType, setOctave })(Synth);
