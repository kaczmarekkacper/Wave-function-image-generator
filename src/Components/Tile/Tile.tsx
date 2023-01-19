import React from "react";

import blank from "../../tiles/demo/blank.png";
import down from "../../tiles/demo/down.png";
import left from "../../tiles/demo/left.png";
import right from "../../tiles/demo/right.png";
import up from "../../tiles/demo/up.png";

const getImage = new Map<string, string>([
  ["blank", blank],
  ["down", down],
  ["left", left],
  ["right", right],
  ["up", up],
]);

type TileProps = {
  image: string;
};

function Tile(props: TileProps) {
  console.log(getImage.get(props.image));
  return <img src={getImage.get(props.image)} width={100} height={100} />;
}

export default Tile;
