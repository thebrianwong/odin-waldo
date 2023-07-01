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
  ) => Promise<boolean>;
  closeModal: () => void;
};

export default SubmitScoreModalProps;
