import { useOscillator } from './oscillator'

const Key = ({ additionalHertz }) => {
  const oscillator = useOscillator(440 + additionalHertz * 10);

  return (
    <div
      style={{ width: 50, height: 100, backgroundColor: oscillator.ended() ? 'white' : 'grey', border: 'solid 1px black' }}
      onMouseDown={() => oscillator.start()}
      onMouseUp={() => oscillator.stop()}
      onMouseOut={() => oscillator.stop()}
    />
  );
}

export default Key;
