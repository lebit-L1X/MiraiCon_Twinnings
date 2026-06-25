import { Container, Sprite, Text } from "@pixi/react";
import { Texture } from "pixi.js";
import { useEffect, useState } from "react";

import backgroundAsset from "../assets/background.png";

import { Cotton } from "./Cotton";
import { Kana } from "./Kana";

const kanaPool = [
  "あ", "い", "う", "え", "お",
  "か", "き", "く", "け", "こ",
  "さ", "し", "す", "せ", "そ",
  "た", "ち", "つ", "て", "と",
  "な", "に", "ぬ", "ね", "の",
];

const MAX_FLOWERS = 5;
const KANA_AMOUNT = 5;

export function Canvas({ canvasSize }) {
  const backgroundTexture = Texture.from(backgroundAsset);

  const [score, setScore] = useState(0);

  const [flowers, setFlowers] = useState(
    Array.from({ length: MAX_FLOWERS }, (_, i) => ({
      id: i,
    }))
  );

  const [kanas] = useState(() =>
    Array.from({ length: KANA_AMOUNT }, (_, i) => ({
      id: i,
      value: kanaPool[Math.floor(Math.random() * kanaPool.length)],
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
            id: crypto.randomUUID(),
          },
        ];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const collectFlower = (flowerId) => {
    setScore((prev) => prev + 1);

    setFlowers((prev) =>
      prev.filter((flower) => flower.id !== flowerId)
    );
  };

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
          onCollect={() => collectFlower(flower.id)}
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