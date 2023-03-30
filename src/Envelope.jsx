import { connect } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import { setAttack, setRelease } from './reducers/synth';

import './Envelope.css';

// The envelope graphic represents 3 seconds. 1 second attack, 1 second (middle), 1 second release.
const Envelope = ({ synth, setAttack, setRelease }) => {
  const canvas = useRef();
  const [highlightAttack, setHighlightAttack] = useState(false);
  const [highlightRelease, setHighlightRelease] = useState(false);
  const [movingAttack, setMovingAttack] = useState(false);
  const [movingRelease, setMovingRelease] = useState(false);

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');

    const attackX = synth.attack;
    const releaseX = 160 + synth.release;

    ctx.clearRect(0,0,240,100);

    ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.lineTo(attackX, 20);
    ctx.lineTo(releaseX, 20);
    ctx.lineTo(240, 100);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(attackX, 20, 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(releaseX, 20, 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    if (highlightAttack) {
      ctx.beginPath();
      ctx.arc(attackX, 20, 5, 0, Math.PI * 2);
      ctx.closePath();
      ctx.stroke();
    }

    if (highlightRelease) {
      ctx.beginPath();
      ctx.arc(releaseX, 20, 5, 0, Math.PI * 2);
      ctx.closePath();
      ctx.stroke();
    }
  });

  // TODO: put all these drag and drop stuff into a library function or something
  const onMouseMove = ({ clientX, clientY, movementX }) => {
    const { left, top } = canvas.current.getBoundingClientRect();
    const x = clientX - left; 
    const y = clientY - top;

    const attackX = synth.attack;
    const releaseX = 160 + synth.release;

    // TODO: awfully redundent
    if (y > 0 && y < 40) {
      if (x < attackX + 20 && x > attackX - 20) {
        setHighlightAttack(true);
      } else if (highlightAttack) setHighlightAttack(false);

      if (x < releaseX + 20 && x > releaseX - 20) {
        setHighlightRelease(true);
      } else if (highlightRelease) setHighlightRelease(false);
    } else {
      if (highlightAttack) setHighlightAttack(false);
      else if (highlightRelease) setHighlightRelease(false);
    }

    if (movementX !== 0) {
      console.log(movementX, synth.attack + movementX);
      if (movingAttack) setAttack(synth.attack + movementX);
      if (movingRelease) setRelease(synth.release + movementX);
    }
  };

  const onMouseDown = () => {
    if (highlightAttack) setMovingAttack(true);
    if (highlightRelease) setMovingRelease(true);
  };

  const onMouseUp = () => {
    if (movingAttack) setMovingAttack(false);
    if (movingRelease) setMovingRelease(false);
  };

  const cursor = (() => {
    if (movingAttack || movingRelease) return 'grabbing';
    else if (highlightAttack || highlightRelease) return 'grab';
  })()

  return <canvas width="240" height="100" className="envelope" ref={canvas} onMouseMove={onMouseMove} onMouseDown={onMouseDown} onMouseUp={onMouseUp} style={{ cursor }} />
};

export default connect(({ synth }) => ({ synth }), { setAttack, setRelease })(Envelope);
