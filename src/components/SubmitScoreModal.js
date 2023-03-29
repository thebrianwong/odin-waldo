import { useEffect, useRef, useState } from "react";

const SubmitScoreModal = ({
  timeScore,
  displayTime,
  submitScore,
  closeModal,
}) => {
  const nameInputRef = useRef(null);

  const [name, setName] = useState("");
  const [favoritePokemon, setFavoritePokemon] = useState("");

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  const attemptSubmit = () => {
    const successfulSubmit = submitScore(timeScore, name, favoritePokemon);
    if (successfulSubmit) {
      closeModal();
    }
  };

  return (
    <div
      className="modal-background"
      data-testid="modal-background"
      onClick={closeModal}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          closeModal();
        }
      }}
    >
      <div
        className="modal"
        data-testid="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-button" onClick={closeModal}>
          X
        </button>
        <h1 className="modal-congrats">You Found All of the Pokemon!</h1>
        <p className="modal-score">Score: {displayTime}</p>
        <form className="modal-form">
          <label className="modal-label" htmlFor="name">
            Your Name
            <input
              className="modal-input"
              id="name"
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
          <label className="modal-label" htmlFor="favorite">
            Your Favorite Pokemon
            <input
              className="modal-input"
              id="favorite"
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
        <button className="modal-submit-button" onClick={attemptSubmit}>
          Submit Score
        </button>
      </div>
    </div>
  );
};

export default SubmitScoreModal;
