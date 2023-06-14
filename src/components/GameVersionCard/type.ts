import Difficulty from "../../types/difficulty.type";
import GameVersion from "../../types/gameVersion.type";
import { VersionData } from "../../types/pokemonData.type";

type GameVersionCardProps = {
  difficulty: Difficulty;
  gameData: VersionData;
  gameVersion: GameVersion;
  chooseGameVersion: (gameVersion: GameVersion) => void;
};

export default GameVersionCardProps;
