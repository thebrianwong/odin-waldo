import PokemonNameList from "./PokemonNameList";

const DropdownMenu = ({
  clickPosition,
  clientPosition,
  gameData,
  gameVersion,
  handlePickedOption,
}) => {
  const VIEWPORT_HEIGHT = document.body.clientHeight;
  const VIEWPORT_WIDTH = document.body.clientWidth;
  const MENU_HEIGHT = 150;
  const MENU_WIDTH = 175;
  const LEEWAY_MARGIN = 15;
  const normalizeYCoordinate = () => {
    if (clientPosition.y + MENU_HEIGHT > VIEWPORT_HEIGHT - LEEWAY_MARGIN) {
      return clientPosition.y - VIEWPORT_HEIGHT;
    }
    return clientPosition.y;
  };
  return (
    <div
      style={{
        position: "absolute",
        top: normalizeYCoordinate(),
        left: clickPosition.x,
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
