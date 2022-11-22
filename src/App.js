import './App.css';
import Square from './Components/Square';
import { useState } from 'react';

function App() {
  const n = 15;
  const [grid, setGrid] = useState(Array.from({length: n},()=> Array.from({length: n}, () => false)));
  const [disabled, setDisabled] = useState(false);


  const start = async () => {
    setDisabled(true);
    let result = next();
    await delay(150);
    if(result === true) start();
    else setDisabled(false);
  }

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const next = () => {
    let copy = [...grid];
    let isChanged = false;
    console.log('tick');
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        let count = getCellNeighbors(i, j);

        if (grid[i][j] && (count < 2 || count > 3)) {
          copy[i][j] = false;
          isChanged = true;
        }
        else if (!grid[i][j] && count === 3) {
          copy[i][j] = true;
          isChanged = true;
        }
      }
    }
    setGrid(copy);
    return isChanged;
  };

  const getCellNeighbors = (row, column) => {
    let count = 0;
    if (row > 0 && column > 0 && grid[row - 1][column - 1]) count++;
    if (row > 0 && grid[row - 1][column]) count++;
    if (row > 0 && column < n - 1 && grid[row - 1][column + 1]) count++;
    if (column > 0 && grid[row][column - 1]) count++;
    if (column < n - 1 && grid[row][column + 1]) count++;
    if (row < n - 1 && column > 0 && grid[row + 1][column - 1]) count++;
    if (row < n - 1 && grid[row + 1][column]) count++;
    if (row < n - 1 && column < n - 1 && grid[row + 1][column + 1]) count++;
    return count;
  };

  const changeCellState = (row, column) => {
    let copy = [...grid];
    copy[row][column] = !copy[row][column];
    setGrid(copy);
  };

  const setup = () => {
    let i = 1;
    while(i < n*2) {
      changeCellState(Math.floor(Math.random() * n), Math.floor(Math.random() * n));
      i++;
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <div className="grid grid-cols-1">
          {grid.map((array, i) => {
            return (
              <div key={i}>
                {array.map((square, j) => {
                  return <Square key={j} state={square} coord={[i, j]} fct={changeCellState} />;
                })}
              </div>
            );
          })}
        </div>
        <div className="flex gap-5 mt-4">
          <button disabled={disabled} onClick={setup}>Setup</button>
          <button disabled={disabled} onClick={start}>Start</button>
        </div>
      </header>
    </div>
  );
}

export default App;
