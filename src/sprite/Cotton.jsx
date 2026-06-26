import { Sprite, useTick } from "@pixi/react";
import { Texture } from "pixi.js";
import { useEffect, useRef } from "react";

import itemAsset from "../assets/item.png";

const texture = Texture.from(itemAsset);

export function Cotton({ canvasSize, onCollect }) {
  const spriteRef = useRef(null);

  const state = useRef({
    x: canvasSize.width + Math.random() * 200,
    y: Math.random() * (canvasSize.height * 0.66),
    t: Math.random() * 1000,
  });

  useEffect(() => {
    const sprite = spriteRef.current;
    if (!sprite) return;

    sprite.x = state.current.x;
    sprite.y = state.current.y;
  }, []);

  useTick(() => {
    const sprite = spriteRef.current;
    if (!sprite) return;

    state.current.t += 0.02;

    state.current.x -= 0.8;
    state.current.y += Math.sin(state.current.t) * 0.4;

    if (state.current.x < -100) {
      state.current.x =
        canvasSize.width + Math.random() * 200;

      state.current.y =
        Math.random() * (canvasSize.height * 0.66);
    }

    sprite.x = state.current.x;
    sprite.y = state.current.y;
  });

  return (
    <Sprite
      ref={spriteRef}
      texture={texture}
      width={50}
      height={50}
      anchor={0.5}
      eventMode="static"
      cursor="pointer"
      pointertap={onCollect}
    />
  );
}