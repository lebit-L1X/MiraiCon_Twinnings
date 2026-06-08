import { Lyrics } from "./components/Lyrics";
import { Controls } from "./components/Controls";
import { useTextAlive } from "./hooks/useTextAlive";

export const App = () => {
  const {
    player,
    currentChar,
    isReady,
  } = useTextAlive();

  if (!isReady) {
    return <h1>Loading song...</h1>;
  }

  return (
    <div
      style={{
        padding: "2rem",
      }}
    >
      <Lyrics text={currentChar} />

      <Controls player={player} />
    </div>
  );
};