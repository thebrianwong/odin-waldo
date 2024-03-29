import FormatTime from "../../types/formatTime.type";
import GameVersion from "../../types/gameVersion.type";
import { VersionValidationData } from "../../types/validationData.type";
import { VersionData } from "../../types/pokemonData.type";
import SubmissionResponse from "../../types/submissionResponse.type";

type GameProps = {
  gameData: VersionData;
  gameVersion: GameVersion;
  validationData: VersionValidationData;
  formatTime: FormatTime;
  submitScore: (
    timeInMilliseconds: number,
    playerName: string,
    playerFavoritePokemon: string,
    gameVersion: GameVersion
  ) => Promise<SubmissionResponse>;
};

export default GameProps;
