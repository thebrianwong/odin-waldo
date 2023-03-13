import PokemonNameList from "./PokemonNameList";

const GameVersionCard = ({ gameData, gameVersion, chooseGameVersion }) => {
  return (
    <button onClick={() => chooseGameVersion(gameVersion)}>
      <img />
      <PokemonNameList gameData={gameData} gameVersion={gameVersion} />
    </button>
  );
};

export default GameVersionCard;
