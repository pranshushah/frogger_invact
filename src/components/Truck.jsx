import React, { useCallback } from 'react';
import { MovingObject } from './MovingObjec';
import { useInterval } from '../utils/customHook/useInterval';

export function Truck({ trucks, onTrucksChange }) {
  const moveTrucks = useCallback(() => {
    let trucksCopy = [...trucks];
    trucksCopy = trucksCopy.map((truck) => {
      if (truck.dir === 'up') {
        return {
          ...truck,
          x: parseInt(truck.x) - 1,
        };
      } else {
        return {
          ...truck,
          x: parseInt(truck.x) + 1,
        };
      }
    });
    const newTrucks = [];
    if (!trucksCopy.filter((truck) => truck.x === 7 || truck.x === 1).length) {
      newTrucks.push(
        {
          x: -1,
          y: 6,
          dir: 'down',
          id: Math.random().toString(36).substring(2, 9),
        },
        {
          x: 9,
          y: 5,
          dir: 'up',
          id: Math.random().toString(36).substring(2, 9),
        },
      );
    }
    onTrucksChange(
      trucksCopy
        .filter((truck) => {
          return truck.x <= 9 || truck.x >= -1;
        })
        .concat(newTrucks),
    );
  }, [trucks]);
  useInterval(moveTrucks, 400);
  return (
    <>
      {trucks.map((truck) => {
        return (
          <MovingObject
            x={truck.x}
            y={truck.y}
            type='truck'
            dir={truck.dir}
            key={truck.id}
          />
        );
      })}
    </>
  );
}
