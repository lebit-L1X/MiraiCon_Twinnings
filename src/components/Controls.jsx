export const Controls = ({ player }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
      }}
    >
      <button onClick={() => player?.requestPlay()}>
        Play
      </button>

      <button onClick={() => player?.requestPause()}>
        Pause
      </button>

      <button onClick={() => player?.requestStop()}>
        Stop
      </button>
    </div>
  );
};