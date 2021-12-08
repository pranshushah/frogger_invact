import React from 'react';
import { truckDown, truckUp, boatDown, boatUp } from '../utils/images';
import { world_size, aspact_ratio } from '../utils/constant';

export function MovingObject({ x, y, dir, type }) {
  const yOffset = ((100 / world_size) * aspact_ratio) / 1.8;
  const yBase = yOffset * y + yOffset / 1.5;
  const xBase = 50 - (100 / 19) * y;
  const xAbs = xBase + (50 / 9) * x;
  const yAbs = yBase + yOffset * x;
  let src;
  if (type === 'boat' && dir === 'up') {
    src = boatUp;
  } else if (type === 'boat' && dir === 'down') {
    src = boatDown;
  } else if (type === 'truck' && dir === 'down') {
    src = truckDown;
  } else if (type === 'truck' && dir === 'up') {
    src = truckUp;
  }
  return (
    <img
      src={src}
      alt={type}
      style={{
        left: `${xAbs}%`,
        top: `${yAbs}%`,
        display: x < -1 || x > 9 ? 'none' : 'block',
        opacity: x < 0 || x > 8 ? 0 : 1,
      }}
      className={type}
    />
  );
}
