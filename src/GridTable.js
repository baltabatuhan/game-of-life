import React from "react";

function GridTable({
  grid,
  toggleCellLife,
  col,
  bg,
  year,
  end,
  isStable,
  size = 16,
}) {
  return (
    <div style={{ paddingTop: 20 }}>
      {year.toString() && (
        <h3 className="gen">
          Generation<span>{year}</span>
        </h3>
      )}
      {end && <p>{end}</p>}
      {<span>{isStable && "Life is stable on the planet now."}</span>}

      <div className="grid" style={{ width: col * size }}>
        {grid.map((rowArray, row) => {
          return rowArray.map((colValue, col) => {
            return (
              <div
                key={[row, col]}
                onClick={() => toggleCellLife(row, col)}
                style={{
                  width: size - 1,
                  height: size - 1,
                  borderRight: "1px solid #ccc",
                  borderBottom: "1px solid #ccc",
                  backgroundColor: grid[row][col] ? bg : "white",
                }}
              ></div>
            );
          });
        })}
      </div>
    </div>
  );
}

export default GridTable;
