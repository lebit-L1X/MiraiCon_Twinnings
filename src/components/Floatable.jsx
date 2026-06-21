import { Sprite, useTick } from "@pixi/react";
import { useRef, useState } from "react";

export const Floatable = ({
  canvasSize,
  texture,
  size = 100,
  initialSpeed = [2, 5],
}) => {
  const [_, forceUpdate] = useState(0);

  const item = useRef({
    x: canvasSize.width + Math.random() * 300,
    y: Math.random() * canvasSize.height,
    speed:
      initialSpeed[0] +
      Math.random() * (initialSpeed[1] - initialSpeed[0]),
  });

  useTick(() => {
    item.current.x -= item.current.speed;

    if (item.current.x < -100) {
      item.current.x = canvasSize.width + Math.random() * 300;
      item.current.y = Math.random() * canvasSize.height;
    }

    forceUpdate((v) => v + 1);
  });

  return (
    <Sprite
      image={texture}
      x={item.current.x}
      y={item.current.y}
      anchor={0.5}
      width={size}
      height={size}
    />
  );
};