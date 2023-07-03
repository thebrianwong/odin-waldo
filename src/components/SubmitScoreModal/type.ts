import GameVersion from "../../types/gameVersion.type";
import SubmissionResponse from "../../types/submissionResponse.type";

type SubmitScoreModalProps = {
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
};

export default SubmitScoreModalProps;
