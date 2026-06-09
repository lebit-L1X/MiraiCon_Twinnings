import { useEffect, useState } from "react";
import { createPlayer } from "../services/textAlive";

export const useTextAlive = () => {
  const [player, setPlayer] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isSongReady, setSongReady] = useState(false);

  useEffect(() => {
    const playerInstance = createPlayer();

    playerInstance.volume = 10;

    let lastPosition = 0;
    const playerListener = {
      onAppReady(app){
        setPlayer(playerInstance);
        setIsReady(true);
      },

      onVideoReady(video) {
        console.log(
          "Video ready:",
          video.charCount,
          "characters"
        );

        setCurrentPosition(0);
      },

      onAppMediaChange(songUrl) {
        console.log("Host requested new song:", songUrl);
      },

      onTimerReady() {
        console.log("Timer ready");
        setSongReady(true);
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
        if (!playerInstance.video) return;
        setCurrentPosition(position);  
      },
    };

    playerInstance.addListener(playerListener);

    return () => {
      playerInstance.removeListener(playerListener);
      playerInstance.dispose?.();
    };
  }, []);

  return {
    player,
    currentPosition,
    isReady,
    isSongReady,
  };
};