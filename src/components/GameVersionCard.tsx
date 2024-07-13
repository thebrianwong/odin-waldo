import PokemonNameList from "./PokemonNameList";
import { gameVersionImages } from "../app/assets";
import Difficulty from "../types/difficulty.type";
import { VersionData } from "../types/pokemonData.type";
import GameVersion from "../types/gameVersion.type";

interface GameVersionCardProps {
  difficulty: Difficulty;
  gameData: VersionData;
  gameVersion: GameVersion;
}

const GameVersionCard = ({
  difficulty,
  gameData,
  gameVersion,
}: GameVersionCardProps) => {
  return (
    <button className="homepage-game-option-button">
      <img
        className="homepage-preview-image"
        data-testid="preview-image"
        src={gameVersionImages[gameVersion]}
        alt={`A preview thumbnail of the ${difficulty} version of the game.`}
      />
      <p className="homepage-game-option-difficulty">{difficulty}</p>
      <PokemonNameList gameData={gameData} />
    </button>
  );
};

export default GameVersionCard;
