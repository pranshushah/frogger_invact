import React, { useEffect, useState } from 'react';
import './App.css';
import { World } from './components/World';

function App() {
  const [numberOfGamesPlayer1Won, setNumberOfGamesPlayer1Won] = useState(0);
  const [numberOfGamesPlayer2Won, setNumberOfGamesPlayer2Won] = useState(0);

  useEffect(() => {
    document.title = 'frogger';
  }, []);
  return (
    <div className='App'>
      <div className='details'>
        <div>
          <p>P-1 color(green) use arrow keys to move</p>
          <p>P-2 color(grey) use W,S,A,D keys to move</p>
        </div>
        <h3>NOTE : use scrollbar to scrolldown.</h3>
        <div>
          <h2>
            SCOARE CARD : P1 - {numberOfGamesPlayer1Won} P2-
            {numberOfGamesPlayer2Won}
          </h2>
        </div>
      </div>
      <h1>FROGGER</h1>
      <World
        onPlayer1Win={setNumberOfGamesPlayer1Won}
        onPlayer2Win={setNumberOfGamesPlayer2Won}
      />
    </div>
  );
}

export default App;
