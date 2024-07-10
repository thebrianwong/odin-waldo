import { useEffect, useRef, useState } from "react";
import SubmissionResponse from "../types/submissionResponse.type";
import GameVersion from "../types/gameVersion.type";

interface SubmitScoreModalProps {
  timeScore: number;
  displayTime: string;
  gameVersion: GameVersion;
  submitScore: (
    timeInMilliseconds: number,
    playerName: string,
    playerFavoritePokemon: string,
    gameVersion: GameVersion
  ) => Promise<SubmissionResponse>;
  closeModal: () => void;
}

const SubmitScoreModal = ({
  timeScore,
  displayTime,
  gameVersion,
  submitScore,
  closeModal,
}: SubmitScoreModalProps) => {
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState<string>("");
  const [favoritePokemon, setFavoritePokemon] = useState<string>("");
  const [formErrors, setFormErrors] = useState<Array<string> | null>(null);

  useEffect(() => {
    nameInputRef.current!.focus();
  }, []);

  const attemptSubmit = async () => {
    const submissionResponse: SubmissionResponse = await submitScore(
      timeScore,
      name,
      favoritePokemon,
      gameVersion
    );
    if (submissionResponse.success) {
      closeModal();
    } else {
      setFormErrors(submissionResponse.message!);
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
        {formErrors && (
          <div className="form-error">
            <h2 className="form-error-title">
              Something's wrong with your submission!
            </h2>
            <ul>
              {formErrors.map((error) => {
                return (
                  <li key={error} className="form-error-specific">
                    {error}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <form className="modal-form">
          <label className="modal-label" htmlFor="name">
            <p>
              Your Name <span className="modal-label-optional">(optional)</span>
            </p>
            <input
              className="modal-input"
              id="name"
              type="text"
              placeholder="Anonymous Trainer"
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
            <p>
              Your Favorite Pokemon{" "}
              <span className="modal-label-optional">(optional)</span>
            </p>
            <input
              className="modal-input"
              id="favorite"
              type="text"
              placeholder="Missingno"
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
