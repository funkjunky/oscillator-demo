const Key = ({ pressed, press, release }) => (
  <div
    style={{ width: 50, height: 100, backgroundColor: pressed ? 'grey' : 'white', border: 'solid 1px black' }}
    onMouseDown={press}
    onMouseUp={release}
  />
);

export default Key;
