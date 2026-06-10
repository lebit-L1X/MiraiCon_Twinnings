import { useEffect, useRef } from 'react';
import { Game } from '../pixi/Game';

export const GameCanvas = () => {
  const ref = useRef(null);

  useEffect(() => {
    const game = new Game();
    console.log(ref.current);
    game.init(ref.current);

    return () => {
      
    };
  }, []);

return (
  <div
    ref={ref}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: -1,
    }}
  />
);
}