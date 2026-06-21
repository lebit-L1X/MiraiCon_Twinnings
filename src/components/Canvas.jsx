import { Container, Sprite } from "@pixi/react";
import { Texture } from "pixi.js";
import backgroundAsset from "../assets/background.png";
import itemAsset from "../assets/item.png";
import { Floatable } from "./Floatable";

export const Canvas = ({ canvasSize }) => {
  const backgroundTexture = Texture.from(backgroundAsset);

  // create 5 instances
  const floatables = Array.from({ length: 5 }, (_, i) => i);

  return (
    <Container sortableChildren={true}>
      {/* Background */}
      <Sprite
        texture={backgroundTexture}
        width={canvasSize.width}
        height={canvasSize.height}
        zIndex={0}
      />

      {/* Floatables */}
      {floatables.map((id) => (
        <Floatable
          key={id}
          canvasSize={canvasSize}
          texture={itemAsset}
          size={100}
        />
      ))}
    </Container>
  );
};