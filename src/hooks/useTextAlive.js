import { useEffect, useState } from "react";
import { createPlayer } from "../services/textAlive";

const SONG_URL =
  "https://piapro.jp/t/6W2N/20251215164617";

export const useTextAlive = () => {
  const [player, setPlayer] = useState(null);
  const [currentChar, setCurrentChar] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const playerInstance = createPlayer();

    playerInstance.addListener({
      onVideoReady(video) {
        console.log(
          "Video ready:",
          video.charCount,
          "characters"
        );

        setIsReady(true);
      },

      onTimerReady() {
        console.log("Timer ready");
      },

      onPlay() {
        console.log("Playback started");
      },

      onPause() {
        console.log("Playback paused");
      },

      onStop() {
        console.log("Playback stopped");
      },

      onTimeUpdate(position) {
        const char =
          playerInstance.video?.findChar(position);

        setCurrentChar(char?.text ?? "");
      },
    });

    playerInstance
      .createFromSongUrl(SONG_URL)
      .then(() => {
        setPlayer(playerInstance);
      });

    return () => {
      playerInstance.dispose?.();
    };
  }, []);

  return {
    player,
    currentChar,
    isReady,
  };
};