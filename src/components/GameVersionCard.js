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
        style={{ width: "500px" }}
        src={require(`../assets/images/game_versions/${gameVersion}.png`)}
      />
      <p>{difficulty}</p>
      <PokemonNameList gameData={gameData} gameVersion={gameVersion} />
    </button>
  );
};

export default GameVersionCard;
