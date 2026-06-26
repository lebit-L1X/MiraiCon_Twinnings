import { Text, useTick } from "@pixi/react";
import { useRef } from "react";

export function Kana({ canvasSize, kana }) {
  const textRef = useRef(null);

  const state = useRef({
    x: canvasSize.width + Math.random() * 300,
    y: Math.random() * (canvasSize.height * 0.66),
    speed: 2 + Math.random() * 3,
  });

  useTick(() => {
    const text = textRef.current;
    if (!text) return;

    state.current.x -= state.current.speed;

    if (state.current.x < -100) {
      state.current.x =
        canvasSize.width + Math.random() * 300;

      state.current.y =
        Math.random() * (canvasSize.height * 0.66);
    }

    text.x = state.current.x;
    text.y = state.current.y;
  });

  return (
    <Text
      ref={textRef}
      text={kana}
      anchor={0.5}
      style={{
        fill: "white",
        fontSize: 72,
        fontWeight: "bold",
      }}
    />
  );
}