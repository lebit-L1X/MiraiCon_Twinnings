import { Container, Sprite, Text } from "@pixi/react";
import { Texture } from "pixi.js";

import backgroundAsset from "../assets/background.png";

import { Cotton } from "./Cotton";
import { Kana } from "./Kana";

export function Canvas({
  canvasSize,
  score,
  flowers,
  kanas,
  onCollectFlower,
}) {
  const backgroundTexture = Texture.from(backgroundAsset);

  return (
    <Container>
      <Sprite
        texture={backgroundTexture}
        width={canvasSize.width}
        height={canvasSize.height}
      />

      <Text
        text={`Flowers: ${score}`}
        x={20}
        y={20}
        style={{
          fill: "red",
          fontSize: 32,
          fontWeight: "bold",
        }}
      />

      {flowers.map((flower) => (
        <Cotton
          key={flower.id}
          canvasSize={canvasSize}
          onCollect={() => onCollectFlower(flower.id)}
        />
      ))}

      {kanas.map((kana) => (
        <Kana
          key={kana.id}
          canvasSize={canvasSize}
          kana={kana.value}
        />
      ))}
    </Container>
  );
}