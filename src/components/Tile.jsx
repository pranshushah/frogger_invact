import React from 'react';

export function Tile({ src, x, y, z, alt }) {
  return (
    <img
      src={src}
      className='tile'
      style={{ zIndex: z, left: `${x}%`, top: `${y}%` }}
      alt={alt}
    />
  );
}
