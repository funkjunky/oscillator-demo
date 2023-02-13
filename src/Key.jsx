import { useEffect, useState } from 'react'

const Key = ({ oscillator, isMouseDown }) => {
  //messy next two lines... TODO clean up (im not sure how yet)
  const [oscIsSet, setOscIsSet] = useState(oscillator.oscillator);
  useEffect(() => setOscIsSet(!!oscillator.oscillator), [oscillator.oscillator])

  return (
    <div
      style={{ width: 50, height: 100, backgroundColor: !oscIsSet ? 'white' : 'grey', border: 'solid 1px black' }}
      onMouseEnter={() => isMouseDown && oscillator.start()}
      onMouseLeave={() => isMouseDown && oscillator.stop()}
      onMouseDown={() => oscillator.start()}
      onMouseUp={() => oscillator.stop()}
    />
  );
}

export default Key;
