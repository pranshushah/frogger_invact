import React, { useEffect, useState } from 'react';
import Landscape from './Landscape';
import { Truck } from './Truck';
import { Boats } from './Boats';
import Frog from './Frog';

const p1InitialState = {
  x: 2,
  y: 8,
  dir: 'up',
  dead: false,
  player: 1,
};

const p2InitialState = {
  x: 5,
  y: 8,
  dir: 'up',
  dead: false,
  player: 2,
};

export function World({ onPlayer1Win, onPlayer2Win }) {
  const [frog1Position, setFrog1Position] = useState(p1InitialState);
  const [frog2Position, setFrog2Position] = useState(p2InitialState);

  const [trucksPosition, setTrucksPosition] = useState([
    {
      x: -1,
      y: 6,
      dir: 'down',
      id: Math.random().toString(36).substring(2, 9),
    },
    { x: 9, y: 5, dir: 'up', id: Math.random().toString(36).substring(2, 9) },
  ]);

  const [boatsPosition, setBoatsPosition] = useState([
    { x: -1, y: 2, dir: 'down', id: Math.random().toString(36).substr(2, 9) },
    { x: 9, y: 1, dir: 'up', id: Math.random().toString(36).substr(2, 9) },
  ]);

  const [player1gameOver, setPlayer1gameOver] = useState(false);
  const [player2gameOver, setPlayer2gameOver] = useState(false);

  // if both players are dead none of them is winner

  useEffect(() => {
    if (player1gameOver && player2gameOver) {
      setTimeout(() => {
        setFrog1Position(p1InitialState);
        setFrog2Position(p2InitialState);
        setPlayer1gameOver(false);
        setPlayer2gameOver(false);
      }, 1000);
    }
  }, [player1gameOver, player2gameOver]);

  // key Handler
  useEffect(() => {
    const keyUpHandler = (e) => {
      e.preventDefault();
      if (player1gameOver && player2gameOver) {
        return;
      } else {
        if (e.key === 'ArrowLeft') {
          if (!frog1Position.dead) {
            setFrog1Position((frogPosition) => {
              return {
                ...frogPosition,
                x: frogPosition.x > 0 ? frogPosition.x - 1 : 0,
                y: frogPosition.y,
                dir: 'left',
              };
            });
          }
        } else if (e.key === 'a') {
          if (!frog2Position.dead) {
            setFrog2Position((frogPosition) => {
              return {
                ...frogPosition,
                x: frogPosition.x > 0 ? frogPosition.x - 1 : 0,
                y: frogPosition.y,
                dir: 'left',
              };
            });
          }
        } else if (e.key === 'ArrowRight') {
          if (!frog1Position.dead) {
            setFrog1Position((frogPosition) => {
              return {
                ...frogPosition,
                x: frogPosition.x < 8 ? frogPosition.x + 1 : 8,
                y: frogPosition.y,
                dir: 'right',
              };
            });
          }
        } else if (e.key === 'd') {
          if (!frog2Position.dead) {
            setFrog2Position((frogPosition) => {
              return {
                ...frogPosition,
                x: frogPosition.x < 8 ? frogPosition.x + 1 : 8,
                y: frogPosition.y,
                dir: 'right',
              };
            });
          }
        } else if (e.key === 'ArrowUp') {
          if (!frog1Position.dead) {
            setFrog1Position((frogPosition) => {
              return {
                ...frogPosition,
                x: frogPosition.x,
                y: frogPosition.y > -1 ? frogPosition.y - 1 : 0,
                dir: 'up',
              };
            });
          }
        } else if (e.key === 'w') {
          if (!frog2Position.dead) {
            setFrog2Position((frogPosition) => {
              return {
                ...frogPosition,
                x: frogPosition.x,
                y: frogPosition.y > -1 ? frogPosition.y - 1 : 0,
                dir: 'up',
              };
            });
          }
        } else if (e.key === 'ArrowDown') {
          if (!frog1Position.dead) {
            setFrog1Position((frogPosition) => {
              return {
                ...frogPosition,
                x: frogPosition.x,
                y: frogPosition.y < 8 ? frogPosition.y + 1 : 8,
                dir: 'up',
              };
            });
          }
        } else if (e.key === 's') {
          if (!frog2Position.dead) {
            setFrog2Position((frogPosition) => {
              return {
                ...frogPosition,
                x: frogPosition.x,
                y: frogPosition.y < 8 ? frogPosition.y + 1 : 8,
                dir: 'up',
              };
            });
          }
        }
      }
    };
    window.addEventListener('keyup', keyUpHandler);
    return () => {
      window.removeEventListener('keyup', keyUpHandler);
    };
  });

  function restartHandler() {
    setFrog1Position(p1InitialState);
    setFrog2Position(p2InitialState);
    setPlayer1gameOver(false);
    setPlayer2gameOver(false);
  }

  return (
    <>
      <div className='buttonContainer'>
        <button className='restart' onClick={restartHandler}>
          Restart
        </button>
      </div>
      <div className='world'>
        <Landscape />
        <Truck trucks={trucksPosition} onTrucksChange={setTrucksPosition} />
        <Boats boats={boatsPosition} onBoatsChange={setBoatsPosition} />
        <Frog
          {...frog1Position}
          trucks={trucksPosition}
          boats={boatsPosition}
          onGameOverChange={setPlayer1gameOver}
          onFrogPositionChange={setFrog1Position}
          onFrogWin={onPlayer1Win}
          onRestart={restartHandler}
        />
        <Frog
          {...frog2Position}
          trucks={trucksPosition}
          boats={boatsPosition}
          onGameOverChange={setPlayer2gameOver}
          onFrogPositionChange={setFrog2Position}
          onFrogWin={onPlayer2Win}
          onRestart={restartHandler}
        />
      </div>
    </>
  );
}
