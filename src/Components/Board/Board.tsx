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

  useEffect(() => {
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
  }, [props.gridSize]);

  const revealTile = () => {
    const lowestEntropyTile: ImageMetadata | null = findLowestEntropyTile();
    console.log(grid);
    console.log(lowestEntropyTile);
    if (lowestEntropyTile === null) return;
    const possibleOptions = lowestEntropyTile.options;
    const selectedOption = getRandomElement(possibleOptions);
    let gridCopy = JSON.parse(JSON.stringify(grid));
    let x = lowestEntropyTile.coords[0];
    let y = lowestEntropyTile.coords[1];
    gridCopy[x][y].image = selectedOption;
    gridCopy[x][y].options = [];
    gridCopy = recalculateOptions(gridCopy);
    setGrid(gridCopy);
  };

  const findLowestEntropyTile = (): ImageMetadata | null => {
    let grid1d = grid.flat();
    grid1d = grid1d.filter((x) => x.image === null);
    if (grid1d.length > 1) {
      let minEntropy = Math.min(...grid1d.map((x) => x.options.length));
      let minTiles = grid1d.filter((x) => x.options.length === minEntropy);
      const selectedElement: ImageMetadata = getRandomElement(minTiles);
      return selectedElement;
    }
    return null;
  };

  const getRandomElement = (arr: any[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const recalculateOptions = (grid: ImageMetadata[][]) => {
    for (let i = 0; i < props.gridSize; ++i) {
      for (let j = 0; j < props.gridSize; ++j) {
        console.log(i, j);
        if (grid[i][j].image !== null) continue;
        const possibleCoords: [number, number, string][] = [
          [i + 1, j, "down"],
          [i, j + 1, "left"],
          [i - 1, j, "up"],
          [i, j - 1, "right"],
        ];
        for (let k = 0; k < possibleCoords.length; ++k) {
          const coords = possibleCoords[k];
          const x: number = coords[0];
          const y: number = coords[1];
          const direction: string = coords[2];
          if (areCoordsValid(x, y)) {
            console.log(grid[i][j].options);
            grid[i][j].options = trimOptions(grid[i][j], grid[x][y], direction);
            console.log(grid[i][j].options);
          }
        }
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
    const neighbourImage = neighbour.image;
    if (neighbourImage === null) return tile.options;
    const possibilities =
      possibleOptions[neighbourImage as keyof typeof possibleOptions][
        direction as keyof typeof possibleOptions.blank
      ];
    console.log(possibilities);
    const commonElements = getCommonElements(possibilities, tile.options);
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
                return <Tile image={row.image} key={row.key} />;
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
