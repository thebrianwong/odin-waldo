import { useEffect, useRef, useState } from "react";

const SubmitScoreModal = ({
  timeScore,
  displayTime,
  submitScore,
  closeModal,
}) => {
  const [name, setName] = useState("");
  const [favoritePokemon, setFavoritePokemon] = useState("");
  const nameInputRef = useRef(null);
  const attemptSubmit = () => {
    const successfulSubmit = submitScore(timeScore, name, favoritePokemon);
    if (successfulSubmit) {
      closeModal();
    }
  };
  useEffect(() => {
    nameInputRef.current.focus();
  }, []);
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
      onClick={closeModal}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          closeModal();
        }
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
        <button style={{ alignSelf: "end" }} onClick={closeModal}>
          X
        </button>
        <h1>You Found All of the Pokemon!</h1>
        <p>Score: {displayTime}</p>
        <form style={{ display: "flex" }}>
          <label style={{ display: "flex", flexDirection: "column" }}>
            Your Name
            <input
              type="text"
              ref={nameInputRef}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  attemptSubmit();
                }
              }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column" }}>
            Your Favorite Pokemon
            <input
              type="text"
              onChange={(e) => setFavoritePokemon(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  attemptSubmit();
                }
              }}
            />
          </label>
        </form>
        <button onClick={attemptSubmit}>Submit Score</button>
      </div>
    </div>
  );
};

export default SubmitScoreModal;
