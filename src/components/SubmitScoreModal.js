import { useState } from "react";

const SubmitScoreModal = ({ timeScore, displayTime, submitScore }) => {
  const [name, setName] = useState("");
  const [favoritePokemon, setFavoritePokemon] = useState("");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        zIndex: "1",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
          backgroundColor: "white",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button style={{ alignSelf: "end" }}>X</button>
        <h1>You Found All of the Pokemon!</h1>
        <p>Score: {displayTime}</p>
        <div style={{ display: "flex" }}>
          <label style={{ display: "flex", flexDirection: "column" }}>
            Your Name
            <input type="text" onChange={(e) => setName(e.target.value)} />
          </label>
          <label style={{ display: "flex", flexDirection: "column" }}>
            Your Favorite Pokemon
            <input
              type="text"
              onChange={(e) => setFavoritePokemon(e.target.value)}
            />
          </label>
        </div>
        <button onClick={submitScore(timeScore, name, favoritePokemon)}>
          Submit Score
        </button>
      </div>
    </div>
  );
};

export default SubmitScoreModal;
