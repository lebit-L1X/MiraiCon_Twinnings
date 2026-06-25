import { Container, Sprite, Text } from "@pixi/react";
import { Texture } from "pixi.js";
import { useState, useEffect } from "react";

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
  const MAX_FLOWERS = 5;
  const KANA_AMOUNT = 5;

  const backgroundTexture = Texture.from(backgroundAsset);

  const [flowersCollected, setFlowersCollected] = useState(0);

  const [flowers, setFlowers] = useState(
    Array.from({ length: MAX_FLOWERS }, (_, i) => ({
      id: i,
    }))
  );

  const [kanaFloatables] = useState(() =>
    Array.from({ length: KANA_AMOUNT }, (_, i) => ({
      id: i,
      kana: kanaPool[Math.floor(Math.random() * kanaPool.length)],
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setFlowers((prev) => {
        if (prev.length >= MAX_FLOWERS) {
          return prev;
        }

        return [
          ...prev,
          {
            id: Date.now() + Math.random(),
          },
        ];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container sortableChildren={true}>
      <Sprite
        texture={backgroundTexture}
        width={canvasSize.width}
        height={canvasSize.height}
        zIndex={0}
      />

      <Text
        text={`Flowers: ${flowersCollected}`}
        x={20}
        y={20}
        style={{
          fill: "red",
          fontSize: 32,
          fontWeight: "bold",
        }}
      />

      {flowers.map((flower) => (
        <Floatable
          key={flower.id}
          canvasSize={canvasSize}
          type="image"
          content={itemAsset}
          size={50}
          incrementCounter={() => {
            setFlowersCollected((v) => v + 1);

            setFlowers((prev) =>
              prev.filter((f) => f.id !== flower.id)
            );
          }}
        />
      ))}

      {kanaFloatables.map((item) => (
        <Floatable
          key={`kana-${item.id}`}
          canvasSize={canvasSize}
          type="text"
          content={item.kana}
          style={{
            fill: "white",
            fontSize: 72,
            fontWeight: "bold",
          }}
        />
      ))}
    </Container>
  );
};