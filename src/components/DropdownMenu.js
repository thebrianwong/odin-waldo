import PokemonNameList from "./PokemonNameList";

const DropdownMenu = ({
  clickPosition,
  clientPosition,
  gameData,
  gameVersion,
  handlePickedOption,
}) => {
  const VIEWPORT_HEIGHT = window.visualViewport.height;
  const VIEWPORT_WIDTH = window.visualViewport.width;
  const MENU_HEIGHT = 150;
  const MENU_WIDTH = 175;
  const LEEWAY_MARGIN = 5;
  const normalizeYCoordinate = () => {
    if (clientPosition.y + MENU_HEIGHT > VIEWPORT_HEIGHT - LEEWAY_MARGIN) {
      return clickPosition.y - MENU_HEIGHT;
    }
    return clickPosition.y;
  };
  const normalizeXCoordinate = () => {
    if (clientPosition.x + MENU_WIDTH > VIEWPORT_WIDTH - LEEWAY_MARGIN) {
      return clickPosition.x - MENU_WIDTH;
    }
    return clickPosition.x;
  };
  return (
    <div
      style={{
        position: "absolute",
        top: normalizeYCoordinate(),
        left: normalizeXCoordinate(),
        backgroundColor: "rgba(211,211,211, 0.78)",
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
