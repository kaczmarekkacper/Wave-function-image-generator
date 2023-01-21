import React, { useEffect, useState } from "react";
import Tile from "../Tile";

import possibleOptionsJson from "../../tiles/demo/possibleOptions.json";

type possibleOptionsType = {
  blank: possibleDirectionType;
  up: possibleDirectionType;
  right: possibleDirectionType;
  down: possibleDirectionType;
  left: possibleDirectionType;
};

type possibleDirectionType = {
  up: string[];
  right: string[];
  down: string[];
  left: string[];
};

type BoardProps = {
  boardSize: number;
  gridSize: number;
  options: string[];
};

type ImageMetadata = {
  image: string | null;
  options: string[];
  key: string;
  coords: [number, number];
};

const Board = (props: BoardProps) => {
  const [grid, setGrid] = useState<ImageMetadata[][]>([]);
  const [possibleOptions] = useState<possibleOptionsType>(possibleOptionsJson);
  const [tileSize, setTileSize] = useState<number>(0);

  useEffect(() => {
    resetGrid();
  }, [props.gridSize]);

  useEffect(() => {
    setTileSize(props.boardSize / props.gridSize);
  }, [props.boardSize]);

  const revealTile = () => {
    let gridCopy = JSON.parse(JSON.stringify(grid));
    let lowestEntropyTile: ImageMetadata | null = findLowestEntropyTile(
      gridCopy
    );
    if (!lowestEntropyTile) {
      gridCopy = resetGrid();
      lowestEntropyTile = findLowestEntropyTile(gridCopy);
      if (!lowestEntropyTile) return;
    }
    const possibleOptions = lowestEntropyTile.options;
    const selectedOption = getRandomElement(possibleOptions);
    const x = lowestEntropyTile.coords[0];
    const y = lowestEntropyTile.coords[1];
    gridCopy[x][y].image = selectedOption;
    gridCopy[x][y].options = [];
    gridCopy = recalculateOptions(gridCopy, lowestEntropyTile);
    setGrid(gridCopy);
  };

  const findLowestEntropyTile = (
    grid: ImageMetadata[][]
  ): ImageMetadata | null => {
    let grid1d = grid.flat();
    grid1d = grid1d.filter((x) => x.image === null);
    if (grid1d.length >= 1) {
      let minEntropy = Math.min(...grid1d.map((x) => x.options.length));
      let minTiles = grid1d.filter((x) => x.options.length === minEntropy);
      const selectedElement: ImageMetadata = getRandomElement(minTiles);
      return selectedElement;
    }
    return null;
  };

  const resetGrid = () => {
    let newGrid: ImageMetadata[][] = [];
    for (let i = 0; i < props.gridSize; i++) {
      newGrid.push([]);
      for (let j = 0; j < props.gridSize; j++) {
        newGrid[i].push({
          image: null,
          options: props.options,
          key: `${i}x${j}`,
          coords: [i, j],
        });
      }
    }
    setGrid(newGrid);
    return newGrid;
  };

  const getRandomElement = (arr: any[]) => {
    // return arr[Math.floor(Math.random() * arr.length)]; this is like never return last element in array
    return arr.sort(() => 0.5 - Math.random())[0];
  };

  const recalculateOptions = (
    grid: ImageMetadata[][],
    lowestEntropyTile: ImageMetadata
  ) => {
    const x = lowestEntropyTile.coords[0];
    const y = lowestEntropyTile.coords[1];
    const possibleCoords: [number, number, string][] = [
      [x + 1, y, "down"],
      [x, y + 1, "right"],
      [x - 1, y, "up"],
      [x, y - 1, "left"],
    ];
    for (let k = 0; k < possibleCoords.length; ++k) {
      const coords = possibleCoords[k];
      const i: number = coords[0];
      const j: number = coords[1];
      const direction: string = coords[2];
      if (areCoordsValid(i, j)) {
        const tile = grid[x][y];
        const neighbour = grid[i][j];
        grid[i][j].options = trimOptions(tile, neighbour, direction);
      }
    }
    return grid;
  };

  const areCoordsValid = (x: number, y: number) => {
    return x >= 0 && x < props.gridSize && y >= 0 && y < props.gridSize;
  };

  const trimOptions = (
    tile: ImageMetadata,
    neighbour: ImageMetadata,
    direction: string
  ): string[] => {
    const tileImage = tile.image;
    if (tileImage === null) return neighbour.options;
    const possibilities =
      possibleOptions[tileImage as keyof typeof possibleOptions][
        direction as keyof typeof possibleOptions.blank
      ];
    const commonElements = getCommonElements(possibilities, neighbour.options);
    return commonElements;
  };

  const getCommonElements = (arr1: any[], arr2: any[]) => {
    var commonArray = [];
    for (var i = 0; i < arr1.length; i++) {
      for (var j = 0; j < arr2.length; j++) {
        if (arr1[i] === arr2[j]) {
          commonArray.push(arr1[i]);
        }
      }
    }
    return commonArray;
  };

  return (
    <>
      {!!grid ? (
        grid.map((col: ImageMetadata[], i) => {
          return (
            <div className="column" key={i}>
              {col.map((row: ImageMetadata, j) => {
                return <Tile image={row.image} key={row.key} size={tileSize} />;
              })}
            </div>
          );
        })
      ) : (
        <h1>No grid</h1>
      )}
      <button id="create" onClick={() => revealTile()}>
        Reveal tile
      </button>
    </>
  );
};

export default Board;
