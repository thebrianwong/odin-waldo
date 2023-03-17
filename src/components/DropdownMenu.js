import PokemonNameList from "./PokemonNameList";

const DropdownMenu = ({
  imagePosition,
  clickPosition,
  clientPosition,
  imageBorder,
  imageDimensions,
  gameData,
  gameVersion,
  handlePickedOption,
}) => {
  const VIEWPORT_HEIGHT = window.visualViewport.height;
  const VIEWPORT_WIDTH = window.visualViewport.width;
  const MENU_HEIGHT = 150;
  const MENU_WIDTH = 175;
  const LEEWAY_MARGIN = 5;
  const TARGET_AREA_RADIUS = 25;
  const TARGET_AREA_HALF_BORDER = 1;
  const normalizeYCoordinate = () => {
    if (
      imagePosition.y + TARGET_AREA_RADIUS + TARGET_AREA_HALF_BORDER >
      imageDimensions.height - LEEWAY_MARGIN
    ) {
      return (
        imageBorder.bottom -
        MENU_HEIGHT -
        TARGET_AREA_RADIUS -
        TARGET_AREA_HALF_BORDER -
        LEEWAY_MARGIN
      );
    } else if (
      imagePosition.y - TARGET_AREA_RADIUS - TARGET_AREA_HALF_BORDER <
      0 + LEEWAY_MARGIN
    ) {
      return (
        imageBorder.top +
        TARGET_AREA_RADIUS +
        TARGET_AREA_HALF_BORDER +
        LEEWAY_MARGIN
      );
    } else if (
      clientPosition.y + MENU_HEIGHT >
      VIEWPORT_HEIGHT - 3 * LEEWAY_MARGIN
    ) {
      return clickPosition.y - MENU_HEIGHT;
    }
    return clickPosition.y;
  };
  const normalizeXCoordinate = () => {
    if (
      // click near the right border of the image
      imagePosition.x + TARGET_AREA_RADIUS + TARGET_AREA_HALF_BORDER >
      imageDimensions.width - LEEWAY_MARGIN
    ) {
      return (
        imageBorder.right -
        MENU_WIDTH -
        TARGET_AREA_RADIUS -
        TARGET_AREA_HALF_BORDER -
        LEEWAY_MARGIN
      );
    } else if (
      // click near the left border of the image
      imagePosition.x - TARGET_AREA_RADIUS - TARGET_AREA_HALF_BORDER <
      0 + LEEWAY_MARGIN
    ) {
      return (
        imageBorder.left +
        TARGET_AREA_RADIUS +
        TARGET_AREA_HALF_BORDER +
        LEEWAY_MARGIN
      );
    } else if (
      // click near the right edge of the viewport
      VIEWPORT_WIDTH +
        window.visualViewport.pageLeft -
        clickPosition.x -
        MENU_WIDTH <
      0 + LEEWAY_MARGIN
    ) {
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
