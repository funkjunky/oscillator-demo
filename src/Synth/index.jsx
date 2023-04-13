import { connect } from 'react-redux';

import Keyboard from './Keyboard';
import Envelope from './Envelope';
import { types, octaves, offset, setType, setOctave, setOffset, setAttack, setRelease } from '../reducers/synth';

const Synth = ({ synth, setType, setOctave, setOffset, setAttack, setRelease }) => {
  return (
    <fieldset>
      <legend>Synth</legend>
      <div>
        <fieldset style={{ display: 'inline' }}>
          <legend>type:</legend>
          <select value={synth?.type} onChange={({ target }) => setType(target.value)}>
            { types.map(type => (
              <option value={type} key={type}>{type}</option>
            )) }
          </select>
        </fieldset>
        <fieldset style={{ display: 'inline' }}>
          <legend>Octave:</legend>
          <input type="range" min={octaves.min} max={octaves.max} value={synth?.octave} onChange={({ target }) => setOctave(+target.value)} />
          <input type="text" min={octaves.min} max={octaves.max} value={synth?.octave} onChange={({ target }) => setOctave(+target.value)} style={{ width: 10 }}/>
        </fieldset>
        <fieldset style={{ display: 'inline' }}>
          <legend>Envelope:</legend>
          <Envelope />
        </fieldset>
        <fieldset style={{ display: 'inline' }}>
          <legend>Offset:</legend>
          <input type="range" min={offset.min} max={offset.max} value={synth?.offset} onChange={({ target }) => setOffset(+target.value)} />
        </fieldset>

      </div>
      <Keyboard />
    </fieldset>
  );
};

export default connect(({ synth }) => ({ synth }), { setType, setOctave, setOffset, setAttack, setRelease })(Synth);
