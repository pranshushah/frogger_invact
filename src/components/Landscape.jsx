import React from 'react';
import {
  road,
  grass,
  roadGrassAbove,
  roadGrassBelow,
  waterGrassAbove,
  waterGrassBelow,
} from '../utils/images';
import { world_size, aspact_ratio } from '../utils/constant';
import { Tile } from './Tile';

function Landscape() {
  const tiles = [];
  for (let i = world_size; i > 0; i--) {
    if (i === 9 || i === 6 || i === 1) {
      tiles.push(Array(world_size).fill(grass));
    } else if (i === 2) {
      tiles.push(Array(world_size).fill(roadGrassBelow));
    } else if (i === 3 || i === 4) {
      tiles.push(Array(world_size).fill(road));
    } else if (i === 5) {
      tiles.push(Array(world_size).fill(roadGrassAbove));
    } else if (i === 7) {
      tiles.push(Array(world_size).fill(waterGrassBelow));
    } else if (i === 8) {
      tiles.push(Array(world_size).fill(waterGrassAbove));
    }
  }
  const yOffset = (100 / world_size) * (aspact_ratio / 1.82);
  return (
    <>
      {tiles.map((row, y) => {
        const yBase = y !== 2 ? y * yOffset : y * yOffset * 1.25;
        const xBase = 50 - (100 / 18) * y;
        return row.map((tile, x) => {
          const z = x + 100;
          const yAbs = yBase + yOffset * x;
          const xAbs = xBase + (100 / 18) * x;
          return (
            <Tile src={tile} x={xAbs} y={yAbs} z={z} alt={tile} key={xAbs} />
          );
        });
      })}
    </>
  );
}

export default React.memo(Landscape);
