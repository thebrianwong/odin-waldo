import PokemonNameList from "./PokemonNameList";

const DropdownMenu = ({
  position,
  gameData,
  gameVersion,
  handlePickedOption,
}) => {
  return (
    <div style={{ position: "absolute", top: position.y, left: position.x }}>
      <PokemonNameList
        gameData={gameData}
        gameVersion={gameVersion}
        handlePickedOption={handlePickedOption}
      />
    </div>
  );
};

export default DropdownMenu;
