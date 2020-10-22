import React from "react";

function GridTable({ grid, toggleCellLife, col }) {
  return (
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
                backgroundColor: grid[row][col] ? "darkblue" : undefined,
              }}
            ></div>
          );
        });
      })}
    </div>
  );
}

export default GridTable;
