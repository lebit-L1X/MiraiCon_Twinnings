import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

export const Lyrics = () => {
  const { player, currentPosition } = useContext(PlayerContext);
  return (
    <div
      style={{
        fontSize: "5rem",
        textAlign: "center",
        marginBottom: "2rem",
      }}
    >
      {player?.video?.findWord(currentPosition)?.text || ""}
    </div>
  );
};