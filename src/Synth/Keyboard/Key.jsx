const Key = ({ pressed, press, release }) => (
  <div
    style={{ width: 100, height: 200, backgroundColor: pressed ? 'grey' : 'white', border: 'solid 1px black' }}
    onTouchStart={press}
    onTouchEnd={release}
  />
);

export default Key;
