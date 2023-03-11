import { connect } from 'react-redux';

import { press, release } from './reducers/key';

const Key = ({ key, note, press, release }) => (
  <div
    style={{ width: 50, height: 100, backgroundColor: !key?.[note] ? 'white' : 'grey', border: 'solid 1px black' }}
    onMouseDown={() => press(note)}
    onMouseUp={() => release(note)}
  />
);

export default connect(({ key }) => ({ key }), {press, release})(Key);
