export const Card = ({ song, onClick }) => {
  const {title, artist} = song;

  return(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        color: "#ff5733"
      }}
      onClick={onClick}
    >
      <h3>{title}</h3>
      <p>{artist}</p>
    </div>
  )
};