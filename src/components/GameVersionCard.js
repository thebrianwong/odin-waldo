import PokemonNameList from "./PokemonNameList";

const GameVersionCard = ({
  difficulty,
  gameData,
  gameVersion,
  chooseGameVersion,
}) => {
  return (
    <button
      className="homepage-game-option-button"
      onClick={() => chooseGameVersion(gameVersion)}
    >
      <img
        className="homepage-preview-image"
        data-testid="preview-image"
        src={require(`../assets/images/game_versions/${gameVersion}.png`)}
        alt={`A preview thumbnail of the ${difficulty} version of the game.`}
      />
      <p className="homepage-game-option-difficulty">{difficulty}</p>
      <PokemonNameList gameData={gameData} gameVersion={gameVersion} />
    </button>
  );
};

export default GameVersionCard;
