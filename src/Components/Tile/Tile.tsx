import React from "react";

import black from "../../tiles/black.png";

import blank from "../../tiles/demo/blank.png";
import down from "../../tiles/demo/down.png";
import left from "../../tiles/demo/left.png";
import right from "../../tiles/demo/right.png";
import up from "../../tiles/demo/up.png";

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
};

function Tile(props: TileProps) {
  // return <div className="tile"><img title={props.image} src={getImage.get(props.image)} width={100} height={100} key={props.key} /></div>;
  return (
    <img
      title={!!props.image ? props.image : ""}
      src={getImage.get(props.image)}
      width={100}
      height={100}
    />
  );
}

export default Tile;
