import PokemonNameList from "./PokemonNameList";

const DropdownMenu = ({
  position,
  gameData,
  gameVersion,
  handlePickedOption,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        backgroundColor: "lightgray",
      }}
    >
      <PokemonNameList
        gameData={gameData}
        gameVersion={gameVersion}
        handlePickedOption={handlePickedOption}
      />
    </div>
  );
};

export default DropdownMenu;
