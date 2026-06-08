import { Controls } from "./Controls";
import { Lyrics } from "./Lyrics";
import { useTextAlive } from "../hooks/useTextAlive";

export const TextAlivePlayer = () => {
  const {
    player,
    currentChar,
    isReady,
  } = useTextAlive();

  if (!isReady) {
    return <div>Loading song...</div>;
  }

  return (
    <div>
      <Lyrics text={currentChar} />
      <Controls player={player} />
    </div>
  );
};