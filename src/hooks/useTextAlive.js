import { useEffect, useState } from "react";
import { createPlayer } from "../services/textAlive";

export const useTextAlive = () => {
  const [player, setPlayer] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isSongReady, setSongReady] = useState(false);

  const [wordList, setWordList] = useState([]);

  useEffect(() => {
    const playerInstance = createPlayer();

    playerInstance.volume = 10;

    let lastPosition = 0;
    const playerListener = {
      onAppLoad(app, error){
        if(error){
          console.log(error);
        }
      },

      onAppReady(app){
        setPlayer(playerInstance);
        setIsReady(true);

        if(app.managed){
          console.log("YEA");
        }
        else{
          console.log("AFAFA");
        }
      },

      onVideoReady(video) {
        console.log(
          "Video ready:",
          video.wordCount,
          "characters"
        );

        setCurrentPosition(0);
      },

      onAppMediaChange(songUrl, videoPromise) {
        console.log("Host requested new song:", songUrl);

        if(videoPromise){
          videoPromise.then((video) => {
            console.log("New Video Ready");
          })
        }
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

      onSongLoad(song, reason){
        console.log(reason);

        setCurrentPosition(0);
        setSongReady(false);
      },

      onTimeUpdate(position) {
        if (!playerInstance.video) return;
        setCurrentPosition(position);  
      },
      
      onDispose(){
        playerInstance.removeListener(playerListener);
      },

      onThrottledTimeUpdate(position){
        //load the next 10s Kana
      }
    };

    playerInstance.addListener(playerListener);

    return () => {
      playerInstance.dispose();
    };
  }, []);

  return {
    player,
    currentPosition,
    isReady,
    isSongReady,
  };
};