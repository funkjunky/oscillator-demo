import { connect } from 'react-redux';

import Keyboard from './Keyboard';
import { types, setType } from './reducers/synth';

const Synth = ({ synth, setType }) => {
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
      </div>
      <Keyboard />
    </fieldset>
  );
};

export default connect(({ synth }) => ({ synth }), {setType })(Synth);
