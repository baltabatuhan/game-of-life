import React, { useState } from "react";
import { Grid } from "./game";

function App() {
  const [game, setGame] = useState({});
  const [grid, setGrid] = useState([]);
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);

  const handleCreateGrid = (e) => {
    e.preventDefault();
    const game = new Grid(row, col);
    setGame(game);
    setGrid(game.current_life());
  };

  return (
    <form onSubmit={handleCreateGrid}>
      Rows: <input value={row} onChange={(e) => setRow(e.target.value)}></input>
      Cols: <input value={col} onChange={(e) => setCol(e.target.value)}></input>
      <button type="submit">Create Grid</button>
    </form>
  );
}
export default App;
