import { Container, Sprite } from "@pixi/react";
import {Texture} from "pixi.js"
import backgroundAsset from "../assets/background.jpg"
export const Canvas = ({ canvasSize }) => {
  const backgroundTexture = Texture.from(backgroundAsset)
  return (
    <Container>
      {/* Background */}
       <Sprite
        texture = {backgroundTexture}
        width = {canvasSize.width}
        height = {canvasSize.height}>
       </Sprite>
    </Container>
  );
};