import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

export const Controls = () => {
  const { player, isSongReady } = useContext(PlayerContext);

  return (
    <>
      {isSongReady ? 
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <button onClick={() => {
            if (!player?.isPlaying) {
              player?.requestPlay();
            }
          }}
          >
            Play
          </button>

          <button onClick={() => {
            if (player?.isPlaying) {
              player?.requestPause();
            }
          }}
          >
            Pause
          </button>

          <button onClick={() => {
            if (player?.isPlaying) {
              player?.requestStop()
            }
          }}
          >
            Stop
          </button>
        </div> 
      :
        <p>Please Wait.</p>
      }
    </>
  );
};