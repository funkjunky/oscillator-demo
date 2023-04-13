import { useObject, getCursorPosInCanvas, isCursorWithinDistanceOfPoint } from './utilities';

// handles dragging any number of points within a canvas element
const useDrag = ({ ref, grabPoints, height = 100, width = 240, clickableDistanceFromPoint = 20, persistentX, persistentY }) => {
  const [isCursorHoveringOver, setIsCursorHoveringOver] = useObject()
  const [isGrabbing, setIsGrabbing, clearIsGrabbing] = useObject()

  const onMouseMove = e => {
    const cursor = getCursorPosInCanvas(e, ref);

    // highlight point if being hovered
    Object.entries(grabPoints)
      .forEach(([key, { x = () => persistentX, y = () => persistentY }]) =>
        setIsCursorHoveringOver(key,
          isCursorWithinDistanceOfPoint(cursor, { x: x(), y: y() }, clickableDistanceFromPoint)));

    // set point if it's being grabbed
    Object.entries(grabPoints)
      .filter(([key]) => isGrabbing[key])
      .forEach(([key, { set }]) => {
        set.x?.(cursor.x);
        set.y?.(cursor.y);
      });
  };

  const onMouseDown = () =>
    Object.keys(grabPoints)
      .forEach(key =>
        setIsGrabbing(key, isCursorHoveringOver[key]));

  const onMouseUp = () => clearIsGrabbing({});

  const cursor = (() => {
    if (Object.values(isGrabbing).some(v => v)) return 'grabbing';
    if (Object.values(isCursorHoveringOver).some(v => v)) return 'grab';
  })()
  const style = { cursor };

  return { isCursorHoveringOver, isGrabbing, onMouseMove, onMouseDown, onMouseUp, style };
};

export default useDrag;
