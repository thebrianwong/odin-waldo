import PokemonNameList from "./PokemonNameList";

const GameVersionCard = ({ gameData, gameVersion, chooseGameVersion }) => {
  const difficultyLabel = () => {
    if (gameVersion === "version1") {
      return "Normal";
    } else if (gameVersion === "version2") {
      return "Hard";
    } else {
      return "Weird";
    }
  };
  return (
    <button onClick={() => chooseGameVersion(gameVersion)}>
      <img
        style={{ width: "500px" }}
        src={require(`../assets/images/game_versions/${gameVersion}.png`)}
      />
      <p>{difficultyLabel()}</p>
      <PokemonNameList gameData={gameData} gameVersion={gameVersion} />
    </button>
  );
};

export default GameVersionCard;
