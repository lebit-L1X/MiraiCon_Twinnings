import { Container, Sprite, Text } from "@pixi/react";
import { Texture } from "pixi.js";
import backgroundAsset from "../assets/background.png";
import itemAsset from "../assets/item.png";
import { Floatable } from "./Floatable";

const kanaPool = [
  "あ", "い", "う", "え", "お",
  "か", "き", "く", "け", "こ",
  "さ", "し", "す", "せ", "そ",
  "た", "ち", "つ", "て", "と",
  "な", "に", "ぬ", "ね", "の",
];

export const Canvas = ({ canvasSize }) => {
  const backgroundTexture = Texture.from(backgroundAsset);

  const floatables = Array.from({ length: 5 }, (_, i) => i);
  const kanaFloatables = Array.from({ length: 5 }, (_, i) => i);

  return (
    <Container sortableChildren={true}>
      {/* Background */}
      <Sprite
        texture={backgroundTexture}
        width={canvasSize.width}
        height={canvasSize.height}
        zIndex={0}
      />

      {/* Image Floatables */}
      {floatables.map((id) => (
        <Floatable
          key={`img-${id}`}
          canvasSize={canvasSize}
          type="image"
          content={itemAsset}
          size={100}
        />
      ))}

      {/* Kana Floatables */}
      {kanaFloatables.map((id) => (
        <Floatable
          key={`kana-${id}`}
          canvasSize={canvasSize}
          type="text"
          content={kanaPool[Math.floor(Math.random() * kanaPool.length)]}
          size={0} // ignored for text
          style={{
            fill: "white",
            fontSize: 144,
            fontWeight: "bold",
          }}
        />
      ))}
    </Container>
  );
};