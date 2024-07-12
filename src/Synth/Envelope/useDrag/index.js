import { useObject, getCursorPosInCanvas, isCursorWithinDistanceOfPoint } from './utilities';

// handles dragging any number of points within a canvas element
const useDrag = ({ ref, grabPoints, height = 100, width = 240, clickableDistanceFromPoint = 20, persistentX, persistentY }) => {
  // Note: Commented out lines are reminants from mouse based interaction.
  //const [isCursorHoveringOver, setIsCursorHoveringOver] = useObject()
  const [isGrabbing, setIsGrabbing, clearIsGrabbing] = useObject()

  const onTouchMove = e => {
    const cursor = getCursorPosInCanvas(e, ref);

    /*
    // highlight point if being hovered
    Object.entries(grabPoints)
      .forEach(([key, { x = () => persistentX, y = () => persistentY }]) =>
        setIsCursorHoveringOver(key,
          isCursorWithinDistanceOfPoint(cursor, { x: x(), y: y() }, clickableDistanceFromPoint)));
    */

    // set point if it's being grabbed
    Object.entries(grabPoints)
      .filter(([key]) => isGrabbing[key])
      .forEach(([key, { set }]) => {
        set.x?.(cursor.x);
        set.y?.(cursor.y);
      });
  };

  const onTouchStart = e => {
    const cursor = getCursorPosInCanvas(e, ref);

    Object.entries(grabPoints)
      .forEach(([key, { x = () => persistentX, y = () => persistentY }]) => {
        setIsGrabbing(key, isCursorWithinDistanceOfPoint(cursor, { x: x(), y: y() }, clickableDistanceFromPoint));
      });
  };

  const onTouchEnd = () => clearIsGrabbing({});

  const cursor = (() => {
    if (Object.values(isGrabbing).some(v => v)) return 'grabbing';
    //if (Object.values(isCursorHoveringOver).some(v => v)) return 'grab';
  })()
  const style = { cursor };

  return { isGrabbing, onTouchStart, onTouchEnd, onTouchMove, style };
};

export default useDrag;
