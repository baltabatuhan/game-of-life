import React, { useState, useEffect } from "react";
import { Grid } from "./game";
import GridTable from "./GridTable";
import GameTutorial from "./GameTutorial";

import { SketchPicker, HuePicker, CompactPicker } from "react-color";

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
  const [bg, setBg] = useState("#000");

  const handleChangeComplete = (color) => {
    setBg(color.hex);
  };

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
        if (JSON.stringify(old_grid) === JSON.stringify(new_grid)) {
          setIsStable(true);
        }
        if (game.total_cell_count() === 0) {
          setPlaying(false);
          setEnd("Life ended");
        }
        setGrid(new_grid);
        setYear((y) => y + 1);
      }, ms);
      if (game?.total_cell_count() === 0) {
        setPlaying(!playing);
      }
    }

    return () => clearInterval(interval);
  }, [playing]);

  return (
    <div className="wrapper">
      <div className="left">
        <form onSubmit={handleCreateGrid}>
          <label className="left-row">
            Rows:
            <input
              type="text"
              disabled={playing}
              value={row}
              onChange={(e) => setRow(e.target.value)}
            ></input>
          </label>
          <label className="left-row">
            Columns:
            <input
              type="text"
              disabled={playing}
              value={col}
              onChange={(e) => setCol(e.target.value)}
            ></input>
          </label>
          <label className="left-row">
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
              Reset Grid
            </button>
          </label>
        </form>
        <label className="left-row">
          Set Speed ({ms}ms):
          <input
            disabled={!Boolean(game) || playing}
            value={ms}
            onChange={(e) => setMs(e.target.value)}
            type="range"
            min="50"
            max="1000"
          />
        </label>
        <label className="left-row">
          <CompactPicker color={bg} onChangeComplete={handleChangeComplete} />
        </label>
        <label className="left-row">
          <button
            disabled={!Boolean(game) || playing}
            onClick={() => {
              let random = game.random();
              setGrid(random);
            }}
          >
            Revive Random Cells
          </button>
        </label>
        <label className="left-row">
          <button
            disabled={!Boolean(parseInt(row) * parseInt(col)) || !Boolean(game)}
            onClick={toggleStart}
          >
            {playing ? "Stop" : "Start"}
          </button>
        </label>
      </div>
      <div className="right">
        <GameTutorial />
        {game && (
          <GridTable
            style={{ transform: "scale(0.5)" }}
            {...{ grid, toggleCellLife, col, bg, year, end, isStable }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
