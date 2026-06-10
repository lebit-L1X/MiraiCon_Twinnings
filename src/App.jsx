import { Lyrics } from "./components/Lyrics";
import { Controls } from "./components/Controls";
import { SongList } from "./components/SongList";
import { GameCanvas } from "./components/GameCanvas";

import { useTextAlive } from "./hooks/useTextAlive";
import { PlayerContext } from "./context/PlayerContext";

import { useState } from "react";

export const App = () => {
  const TextAlive = useTextAlive();

  const [selectedSong, setSelectedSong] = useState({});

  const handleSelectSong = (song) => {
    setSelectedSong(song);

    console.log("Selected song:", song);

    TextAlive.player.createFromSongUrl(song.musicUrl);
  };

  if (!TextAlive.isReady) {
    return <h1>Loading player...</h1>;
  }

  return (
    <PlayerContext.Provider value={TextAlive}>
      <div className="app">
        {/* Background */}
        <div className="game-canvas">
          <GameCanvas />
        </div>
        {/* Foreground UI */}
        <div className="overlay">
          <SongList onSelect={handleSelectSong} />

          <h3>{selectedSong.title}</h3>

          <Lyrics />

          <Controls />
        </div>
      </div>
    </PlayerContext.Provider>
  );
};