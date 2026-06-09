import { SONGS } from "../hooks/songs";
import { Card } from "../components/Card";
import { useState } from "react";

export const SongList = ({ songs, onSelect }) => {
  const sendSelectedSong = (song) => {
    onSelect(song);
  }

  return(
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          gap: "1rem",
        }}
      >
        { SONGS.map((song) => {
          return <Card key={song.id} song={song} onClick={() => sendSelectedSong(song)} />
        })}
      </div>
    </div>
  );
};