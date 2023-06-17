import GameProgress from "../../types/gameProgress.type";
import { VersionData } from "../../types/pokemonData.type";

type NavBarProps = {
  gameData: VersionData;
  gameProgress: GameProgress;
  elapsedTime: string;
};

export default NavBarProps;
