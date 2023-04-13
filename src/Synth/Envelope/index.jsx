import { connect } from 'react-redux';
import { useEffect, useRef } from 'react';

import { setAttack, setRelease } from '../../reducers/synth';

import useDrag from './useDrag';
import { drawCircle, drawLine } from './canvas';

import './index.css';

// The envelope graphic represents 3 seconds. 1 second attack, 1 second (middle), 1 second release.
const Envelope = ({ synth, setAttack, setRelease }) => {
  const ref = useRef();

  const grabPoints = {
    attack: { x: () => synth.attack, set: { x: setAttack } },
    release: { x: () => (160 + synth.release), set: { x: x => setRelease(x - 160) } },
  };

  const { isCursorHoveringOver, isGrabbing, ...dragProps } = useDrag({ ref, grabPoints, persistentY: 20 });

  useEffect(() => {
    const ctx = ref.current.getContext('2d');

    const attackX = grabPoints.attack.x();
    const releaseX = grabPoints.release.x();

    ctx.clearRect(0,0,240,100);

    ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.lineTo(attackX, 20);
    ctx.lineTo(releaseX, 20);
    ctx.lineTo(240, 100);
    ctx.closePath();
    ctx.stroke();

    drawCircle(ctx, attackX, 20, 2, true);
    drawCircle(ctx, releaseX, 20, 2, true);

    if (isCursorHoveringOver.attack)  drawCircle(ctx, attackX, 20, 5);
    if (isCursorHoveringOver.release) drawCircle(ctx, releaseX, 20, 5);

    ctx.strokeStyle = 'gray';
    if (isGrabbing.attack) {
      drawLine(ctx, attackX, 1, attackX, 100);
    } else if (isGrabbing.release) {
      drawLine(ctx, releaseX, 0, releaseX, 100);
    }
    ctx.strokeStyle = 'black';
  });

  return <canvas width="240" height="100" className="envelope" ref={ref} {...dragProps} />
};

export default connect(({ synth }) => ({ synth }), { setAttack, setRelease })(Envelope);
