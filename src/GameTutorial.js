import React from "react";

function GameTutorial(props) {
  return (
    <div>
      <h2>Game of Life</h2>
      <h3>Before you create your first grid planet</h3>
      <p>
        In this simulation, there is one rule: A cell must have enough neighbors
        to stay alive!
      </p>
      <li>
        If a cell is alive and has two or three neighbors alive, that cell lives
        to the next generation.
      </li>
      <li>
        If a cell is dead and has exactly three neighbors alive, that cell comes
        to life.
      </li>
      <h3>Now let's get started.</h3>
      <li>
        Enter how many rows and columns you want in your planet and create your
        grid.
      </li>
      <li>Set your simulation speed, color, and starting cells.</li>

      <li>Start simulation!</li>
    </div>
  );
}

export default GameTutorial;
