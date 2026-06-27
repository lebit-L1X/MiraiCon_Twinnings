import { useEffect, useState, useCallback } from "react";
import { Stage } from "@pixi/react";

import { Canvas } from "./Canvas";
import { calculateCanvasSize } from "../helpers/common";

const kanaPool = [
  "あ", "い", "う", "え", "お",
  "か", "き", "く", "け", "こ",
  "さ", "し", "す", "せ", "そ",
  "た", "ち", "つ", "て", "と",
  "な", "に", "ぬ", "ね", "の",
];

const MAX_FLOWERS = 5;
const KANA_AMOUNT = 5;

export const Experience = () => {
  const [canvasSize, setCanvasSize] = useState(calculateCanvasSize());

  const [score, setScore] = useState(0);
  const [isNight, setIsNight] = useState(false);

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

  const updateCanvasSize = useCallback(() => {
    setCanvasSize(calculateCanvasSize());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [updateCanvasSize]);

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
    <>
      <button
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 1000,
        }}
        onClick={() => setIsNight((prev) => !prev)}
      >
        Toggle Day / Night
      </button>

      <Stage width={canvasSize.width} height={canvasSize.height}>
        <Canvas
          canvasSize={canvasSize}
          score={score}
          flowers={flowers}
          kanas={kanas}
          isNight={isNight}
          onCollectFlower={collectFlower}
        />
      </Stage>
    </>
  );
};