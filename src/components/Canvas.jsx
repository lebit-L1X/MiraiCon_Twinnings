import { Container, Sprite, Text, useTick } from "@pixi/react";
import { Texture } from "pixi.js";
import { useEffect, useState } from "react";

import { Basket } from "./Basket";
import { Cotton } from "./Cotton";
import { Kana } from "./Kana";

import backgroundAssetDay from "../assets/background-day.jpg";
import backgroundAssetNight from "../assets/background-night.jpg";

export function Canvas({
  canvasSize,
  score,
  flowers,
  kanas,
  onCollectFlower,
  basketStage,
}) {
  const dayTexture = Texture.from(backgroundAssetDay);
  const nightTexture = Texture.from(backgroundAssetNight);

  const [nightAlpha, setNightAlpha] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (score >= 20) {
      setTransitioning(true);
    }
  }, [score]);

  useTick((delta) => {
    if (!transitioning) return;

    setNightAlpha((prev) => Math.min(prev + delta * 0.01, 1));
  });

  return (
    <Container>
      {/* Day background */}
      <Sprite
        texture={dayTexture}
        width={canvasSize.width}
        height={canvasSize.height}
      />

      {/* Night background fades in */}
      <Sprite
        texture={nightTexture}
        width={canvasSize.width}
        height={canvasSize.height}
        alpha={nightAlpha}
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

      <Basket
        stage={basketStage}
        canvasSize={canvasSize}
      />
    </Container>
  );
}