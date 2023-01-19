import React, { useEffect, useState } from "react";
import reportWebVitals from "../../reportWebVitals";
import Tile from "../Tile";

type BoardProps = {
  gridSize: number;
};

type imageMetadata = {
  image: string;
  entropy: number;
  chosen: boolean;
  key: string;
};

function Board(props: BoardProps) {
  const [grid, setGrid] = useState<imageMetadata[][]>([]);

  useEffect(() => {
    let newGrid: imageMetadata[][] = [];
    for (let i = 0; i < props.gridSize; i++) {
      newGrid.push([]);
      for (let j = 0; j < props.gridSize; j++) {
        newGrid[i].push({
          image: "blank",
          entropy: Infinity,
          chosen: false,
          key: `${i}x${j}`,
        });
      }
    }
    setGrid(newGrid);
  }, [props.gridSize]);

  return (
    <>
      {!!grid ? (
        grid.map((col) => {
          col.map((row) => {
            <Tile image={row.image} key={row.key} />;
          });
        })
      ) : (
        <h1>No grid</h1>
      )}
    </>
  );
}

export default Board;
