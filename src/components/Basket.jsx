import { Sprite } from "@pixi/react";
import { Texture } from "pixi.js";

import basket0Asset from "../assets/basket0.png";
import basket1Asset from "../assets/basket1.png";
import basket2Asset from "../assets/basket2.png";

const textures = [
  Texture.from(basket0Asset),
  Texture.from(basket1Asset),
  Texture.from(basket2Asset),
];

export function Basket({ stage, canvasSize }) {
  const texture = textures[stage] ?? textures[0];

  return (
    <Sprite
      texture={texture}
      x={30}
      y={canvasSize.height - 180}
      width={160}
      height={160}
    />
  );
}