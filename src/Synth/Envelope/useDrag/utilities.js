import { useState, useCallback } from 'react';

export const useObject = (initialObject = {}) => {
  const [obj, setObject] = useState(initialObject);

  const setKeyValue = useCallback(
    (key, value) => setObject(prev => ({ ...prev, [key]: value })),
    []
  );

  return [obj, setKeyValue, () => setObject({})];
};

export const getCursorPosInCanvas = (e, ref) => {
  const { left, top } = ref.current.getBoundingClientRect();
  const { clientX, clientY } = e.touches?.[0] ?? e;
  return { x: clientX - left, y: clientY - top };
};

export const isCursorWithinDistanceOfPoint = (cursor, { x, y }, clickableDistanceFromPoint) => (
  cursor.y > y - clickableDistanceFromPoint && cursor.y < y + clickableDistanceFromPoint &&
  cursor.x < x + clickableDistanceFromPoint && cursor.x > x - clickableDistanceFromPoint
);
