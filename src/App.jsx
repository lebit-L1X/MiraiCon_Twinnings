import { Lyrics } from "./components/Lyrics";
import { Controls } from "./components/Controls";
import { useTextAlive } from "./hooks/useTextAlive";
import { SongList } from "./components/SongList";
import { useState } from "react";
import { PlayerContext } from "./context/PlayerContext";

export const App = () => {
  const TextAlive = useTextAlive();

  const [selectedSong, setSelectedSong] = useState({});

  const handleSelectSong = (song) => {
    setSelectedSong(song);
    
    console.log("Selected song:", song);
    if(!TextAlive.player.app.managed){
      TextAlive.player.createFromSongUrl(song.musicUrl);
    }
  }

  if (!TextAlive.isReady) {
    return <h1>Loading player...</h1>;
  }

  return (
    <div
      style={{
        padding: "2rem",
      }}
    >
        <PlayerContext.Provider value={TextAlive}>
          <SongList onSelect={handleSelectSong} />
          <h3>{selectedSong.title}</h3>
          <Lyrics />
          <Controls />
        </PlayerContext.Provider>
    </div>
  );
};