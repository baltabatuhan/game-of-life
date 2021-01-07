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
      for (let col = 0; col < this.columns; col++) {
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

  toggle_life(row, col) {
    if (this.cell(row, col).is_alive) {
      this.cell(row, col).is_alive = 0;
      return this.cell(row, col).is_alive;
    } else {
      this.cell(row, col).is_alive = 1;
      return this.cell(row, col).is_alive;
    }
  }
  is_edge(row, col) {
    return this.cell(row, col).is_edge;
  }
  neighbor_count(row, col) {
    let count = 0;
    if (this.is_edge(row, col)) {
      return count;
    }
    let north = this.cell(row - 1, col).is_alive;
    let south = this.cell(row + 1, col).is_alive;
    let east = this.cell(row, col + 1).is_alive;
    let west = this.cell(row, col - 1).is_alive;
    let north_east = this.cell(row - 1, col + 1).is_alive;
    let north_west = this.cell(row - 1, col - 1).is_alive;
    let south_east = this.cell(row + 1, col + 1).is_alive;
    let south_west = this.cell(row + 1, col - 1).is_alive;

    count =
      north +
      south +
      east +
      west +
      north_east +
      north_west +
      south_east +
      south_west;
    return count;
  }
  total_cell_count() {
    return this.current_life().reduce((acc, rows) => {
      return (
        acc +
        rows.reduce((total, cell) => {
          return total + cell;
        }, 0)
      );
    }, 0);
  }
  reset() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        this.cell(row, col).is_alive = 0;
      }
    }
  }
  random() {
    let result = Object.values(this.grid).map((rowArray, row) => {
      return Object.values(rowArray).map((cell, col) => {
        let life = Math.round(Math.random()) && this.toggle_life(row, col);
        return life;
      });
    });
    return result;
  }

  current_life() {
    return Object.values(this.grid).map((line) =>
      Object.values(line).map((cell) => cell.is_alive)
    );
  }
  next_life() {
    let new_game = new Grid(this.rows, this.columns);

    let result = Object.values(this.grid).map((rowArray, row) => {
      return Object.values(rowArray).map((cell, col) => {
        if (!cell.is_edge) {
          if (cell.is_alive) {
            if (
              this.neighbor_count(row, col) === 2 ||
              this.neighbor_count(row, col) === 3
            ) {
              return new_game.toggle_life(row, col);
            } else {
              return new_game.cell(row, col).is_alive;
            }
          } else {
            if (this.neighbor_count(row, col) === 3) {
              return new_game.toggle_life(row, col);
            } else {
              return new_game.cell(row, col).is_alive;
            }
          }
        } else {
          return new_game.cell(row, col).is_alive;
        }
      });
    });
    this.grid = new_game.grid;
    return result;
  }
}
