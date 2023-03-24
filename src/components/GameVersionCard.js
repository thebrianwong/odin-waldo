import PokemonNameList from "./PokemonNameList";

const GameVersionCard = ({
  difficulty,
  gameData,
  gameVersion,
  chooseGameVersion,
}) => {
  return (
    <button onClick={() => chooseGameVersion(gameVersion)}>
      <img
        data-testid="preview-image"
        style={{ width: "500px" }}
        src={require(`../assets/images/game_versions/${gameVersion}.png`)}
        alt={`A preview thumbnail of the ${difficulty} version of the game.`}
      />
      <p>{difficulty}</p>
      <PokemonNameList gameData={gameData} gameVersion={gameVersion} />
    </button>
  );
};

export default GameVersionCard;
