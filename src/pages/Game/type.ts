import FormatTime from "../../types/formatTime.type";
import GameVersion from "../../types/gameVersion.type";
import ValidationData from "../../types/validationData.type";
import VersionData from "../../types/versionData.type";

type GameProps = {
  gameData: VersionData;
  gameVersion: GameVersion;
  validationData: ValidationData;
  formatTime: FormatTime;
  submitScore: (
    timeInMilliseconds: number,
    playerName: string,
    playerFavoritePokemon: string
  ) => boolean;
};

export default GameProps;
