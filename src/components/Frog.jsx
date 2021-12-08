import React, { useEffect } from 'react';
import {
  frogDead,
  frogNE,
  frogNEp2,
  frogNW,
  frogNWp2,
  frogSE,
  frogSEp2,
  frogSW,
  frogSWp2,
} from '../utils/images';
import { world_size, aspact_ratio } from '../utils/constant';

function Frog({
  x,
  y,
  dir,
  player,
  dead,
  boats,
  trucks,
  onGameOverChange,
  onFrogPositionChange,
  onFrogWin,
  onRestart,
}) {
  const yOffset = ((100 / world_size) * aspact_ratio) / 1.8;
  const yBase = yOffset * y + yOffset / 1.5;
  const xBase = 50 - (100 / 19) * y;
  const xAbs = xBase + (50 / 9) * x;
  const yAbs = yBase + yOffset * x;

  let src;
  if (dead) {
    src = frogDead;
  } else if (dir === 'up' && player === 1) {
    src = frogNE;
  } else if (dir === 'down' && player === 1) {
    src = frogSW;
  } else if (dir === 'left' && player === 1) {
    src = frogNW;
  } else if (dir === 'right' && player === 1) {
    src = frogSE;
  } else if (dir === 'up' && player === 2) {
    src = frogNEp2;
  } else if (dir === 'down' && player === 2) {
    src = frogSWp2;
  } else if (dir === 'left' && player === 2) {
    src = frogNWp2;
  } else if (dir === 'right' && player === 2) {
    src = frogSEp2;
  }

  //truck logic
  useEffect(() => {
    function isTruckCollision(frog, trucks) {
      return trucks.some((truck) => {
        return truck.x === frog.x && truck.y === frog.y;
      });
    }
    if (isTruckCollision({ x, y }, trucks)) {
      onGameOverChange(true);
      onFrogPositionChange((currentFrogPosition) => {
        return { ...currentFrogPosition, dead: true };
      });
    }
  }, [trucks, x, y]);

  // boat logic
  useEffect(() => {
    function isDrownging(frog, boats) {
      const yindexOfWater = [1, 2];
      const isRiding = isRidingTheBoat(frog, boats);
      if (!isRiding && yindexOfWater.includes(frog.y)) {
        return true;
      } else {
        return false;
      }
    }
    function isRidingTheBoat(frog, boats) {
      return boats.some((boat) => {
        return boat.x === frog.x && boat.y === frog.y;
      });
    }
    function getRiddenBoat(frog, boats) {
      return boats.find((boat) => {
        return boat.y === frog.y && Math.abs(boat.x - frog.x) <= 1;
      });
    }
    if (isDrownging({ x, y, dir }, boats)) {
      onGameOverChange(true);
      onFrogPositionChange((currentFrogPosition) => {
        return {
          ...currentFrogPosition,
          dead: true,
        };
      });
    } else if (isRidingTheBoat({ x, y, dir }, boats)) {
      const boat = getRiddenBoat({ x, y }, boats);
      onFrogPositionChange((currentFrogPosition) => {
        return { ...currentFrogPosition, x: boat.x, y: boat.y };
      });
    }
  }, [boats, dir, x, y]);

  // finishing line

  useEffect(() => {
    function hasReachedFinishingLine(frog) {
      return frog.y < 0;
    }
    if (hasReachedFinishingLine({ x, y })) {
      onFrogWin((wins) => {
        return wins + 1;
      });
      onRestart();
    }
  }, [x, y]);

  return (
    <img
      src={src}
      x={xAbs}
      y={yAbs}
      alt='frog'
      className='frog'
      style={{
        left: `${xAbs}%`,
        top: `${yAbs}%`,
      }}
    />
  );
}

export default Frog;
