import React, { useState, useEffect } from "react";
import { Grid } from "./game";
import GridTable from "./GridTable";

function App() {
  const [game, setGame] = useState({});
  const [grid, setGrid] = useState([]);
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [year, setYear] = useState(0);
  const [end, setEnd] = useState("");
  const [ms, setMs] = useState(500);
  const [isStable, setIsStable] = useState(false);

  console.log({ grid });

  const handleCreateGrid = (e) => {
    e.preventDefault();
    const game = new Grid(row, col);
    setGame(game);
    setGrid(game.current_life());
  };
  const handleReset = () => {
    game.reset();
    let new_grid = game.current_life();
    setGrid(new_grid);
  };

  const toggleCellLife = (row, col) => {
    game.toggle_life(row, col);
    setGrid(game?.current_life());
  };
  const toggleStart = () => {
    if (!playing && game?.total_cell_count() === 0) {
      alert("Revive some cells to start the life on the planet");
    }
    if (!playing) {
      setEnd("");
      setYear(0);
      setIsStable(false);
    }
    setPlaying(!playing);
  };

  useEffect(() => {
    var interval;
    if (playing) {
      interval = setInterval(() => {
        let old_grid = game.current_life();
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
    <>
      <form onSubmit={handleCreateGrid}>
        Rows:{" "}
        <input
          disabled={playing}
          value={row}
          onChange={(e) => setRow(e.target.value)}
        ></input>
        Cols:{" "}
        <input
          disabled={playing}
          value={col}
          onChange={(e) => setCol(e.target.value)}
        ></input>
        <button
          disabled={playing}
          type="submit"
          onClick={() => console.log("clicked")}
        >
          Create Grid
        </button>
        <button
          disabled={!Boolean(game) || playing}
          type="reset"
          onClick={handleReset}
        >
          Reset
        </button>
      </form>
      <button onClick={toggleStart}>{playing ? "Stop" : "Start"}</button>
      Set Speed ({ms}ms):
      <input
        disabled={playing}
        value={ms}
        onChange={(e) => setMs(e.target.value)}
        type="range"
        min="100"
        max="1000"
      />
      Life:{" "}
      <span>
        {year} {end}
      </span>
      {<span>{isStable && "Life is stable on the planet now."}</span>}
      {game && <GridTable {...{ grid, toggleCellLife, col }} />}
    </>
  );
}

export default App;
