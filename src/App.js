import React, { useState, useEffect } from "react";
import { Grid } from "./game";

function App() {
  const [game, setGame] = useState({});
  const [grid, setGrid] = useState([]);
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [year, setYear] = useState(0);

  const handleCreateGrid = (e) => {
    e.preventDefault();
    const game = new Grid(row, col);
    setGame(game);
    setGrid(game.current_life());
  };

  const toggleCellLife = (row, col) => {
    game.toggle_life(row, col);
    setGrid(game?.current_life());
  };
  const toggleStart = () => setPlaying(!playing);

  useEffect(() => {
    var interval;
    if (playing) {
      interval = setInterval(() => {
        let new_grid = game.next_life();
        setGrid(new_grid);
        setYear((y) => y + 1);
      }, 1000);
      if (game.total_cell_count() === 0) {
        setPlaying(!playing);
      }
    }

    return () => clearInterval(interval);
  }, [playing]);

  return (
    <form onSubmit={handleCreateGrid}>
      Rows: <input value={row} onChange={(e) => setRow(e.target.value)}></input>
      Cols: <input value={col} onChange={(e) => setCol(e.target.value)}></input>
      <button type="submit">Create Grid</button>
      <button onClick={toggleStart}>{playing ? "Stop" : "Start"}</button>
      <span>{year}</span>
      <div className="grid" style={{ width: col * 16 }}>
        {grid.map((rowArray, row) => {
          return rowArray.map((colValue, col) => {
            return (
              <div
                key={[row, col]}
                onClick={() => toggleCellLife(row, col)}
                style={{
                  width: 15,
                  height: 15,
                  borderRight: "1px solid #ccc",
                  borderBottom: "1px solid #ccc",
                  backgroundColor: grid[row][col] ? "black" : undefined,
                }}
              ></div>
            );
          });
        })}
      </div>
    </form>
  );
}

export default App;
