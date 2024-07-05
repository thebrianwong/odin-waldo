import GameVersion from "../../types/gameVersion.type";

type SubmitScoreModalProps = {
  timeScore: number;
  displayTime: string;
  gameVersion: GameVersion;
  closeModal: () => void;
};

export default SubmitScoreModalProps;
