import React from "react";

import black from "../../tiles/black.png";

import blank from "../../tiles/mountains/blank.png";
import down from "../../tiles/mountains/down.png";
import left from "../../tiles/mountains/left.png";
import right from "../../tiles/mountains/right.png";
import up from "../../tiles/mountains/up.png";

const getImage = new Map<string | null, string>([
  [null, black],
  ["blank", blank],
  ["down", down],
  ["left", left],
  ["right", right],
  ["up", up],
]);

type TileProps = {
  image: string | null;
  size: number;
};

function Tile(props: TileProps) {
  // return <div className="tile"><img title={props.image} src={getImage.get(props.image)} width={100} height={100} key={props.key} /></div>;
  return (
    <img
      data-testid={"img"}
      title={!!props.image ? props.image : ""}
      src={getImage.get(props.image)}
      width={props.size}
      height={props.size}
    />
  );
}

export default Tile;
