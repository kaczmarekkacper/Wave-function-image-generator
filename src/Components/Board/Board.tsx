import React, { useEffect, useState } from "react";
import Tile from "../Tile";

type BoardProps = {
  gridSize: number;
};

type imageMetadata = {
  image: string;
  entropy: number;
  chosen: boolean;
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
        });
      }
    }
    setGrid(newGrid);
  }, [props.gridSize]);

  return (
    <>
      {!!grid ? (
        grid.map((col: imageMetadata[], i) => {
          return <div className='column' key={i}>{col.map((row: imageMetadata, j) => {
            return <Tile image={row.image}  key={`${i}x${j}`}/>;
          })}</div>;
        })
      ) : (
        <h1>No grid</h1>
      )}
    </>
  );
}

export default Board;
