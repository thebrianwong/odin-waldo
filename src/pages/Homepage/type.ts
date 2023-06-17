import GameVersion from "../../types/gameVersion.type";
import { GameData } from "../../types/pokemonData.type";

type HomepageProps = {
  gameData: GameData;
  chooseGameVersion: (version: GameVersion) => void;
};

export default HomepageProps;
