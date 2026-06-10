import { Application } from "@pixi/react";

export const GameCanvas = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
      }}
    >
      <Application
        resizeTo={window}
        background={0x1099bb}
      />
    </div>
  );
};