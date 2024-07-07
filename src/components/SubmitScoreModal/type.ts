import SubmissionResponse from "src/types/submissionResponse.type";
import GameVersion from "../../types/gameVersion.type";

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
