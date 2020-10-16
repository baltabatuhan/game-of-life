export class Cell {
  constructor(is_alive, is_edge) {
    this.is_alive = is_alive;
    this.is_edge = is_edge;
  }
}

export class Grid {
  constructor(rows = 25, columns = 25) {
    this.rows = rows;
    this.columns = columns;
    let grid = {};
    for (let row = 0; row < this.rows; row++) {
      grid[row] = {};
      for (let col = 0; col < this.columns; columns++) {
        let is_edge =
          row === 0 ||
          col === 0 ||
          row === this.rows - 1 ||
          col === this.columns - 1;
        grid[row][col] = new Cell(0, is_edge);
      }
    }
    this.grid = grid;
  }
  cell(row, col) {
    return this.grid[row][col];
  }
}
