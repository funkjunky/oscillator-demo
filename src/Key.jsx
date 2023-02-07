const Key = ({ oscillator }) => {
  return (
    <div
      style={{ width: 50, height: 100, backgroundColor: oscillator.ended() ? 'white' : 'grey', border: 'solid 1px black' }}
      onMouseDown={() => oscillator.start()}
      onMouseUp={() => oscillator.stop()}
      onMouseLeave={() => oscillator.stop()}
    />
  );
}

export default Key;
