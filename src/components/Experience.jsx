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
  const [basketStage, setBasketStage] = useState(0);

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

  const collectFlower = (flowerId) => {
    setScore((prev) => {
      const newScore = prev + 1;

      if (newScore >= 10) {
        setBasketStage(2);
      } else if (newScore >= 5) {
        setBasketStage(1);
      } else {
        setBasketStage(0);
      }

      return newScore;
    });

    setFlowers((prev) =>
      prev.filter((flower) => flower.id !== flowerId)
    );
  };

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


  return (
    <Stage width={canvasSize.width} height={canvasSize.height}>
      <Canvas
        canvasSize={canvasSize}
        score={score}
        flowers={flowers}
        kanas={kanas}
        basketStage={basketStage}
        onCollectFlower={collectFlower}
      />
    </Stage>
  );
};