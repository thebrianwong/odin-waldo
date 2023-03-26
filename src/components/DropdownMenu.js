import PokemonNameList from "./PokemonNameList";

const DropdownMenu = ({
  imagePosition,
  clickPosition,
  clientPosition,
  imageBorder,
  gameData,
  gameVersion,
  handlePickedOption,
}) => {
  const VIEWPORT_HEIGHT = window.visualViewport.height;
  const VIEWPORT_WIDTH = window.visualViewport.width;
  const ELEMENT_HEIGHT = 150;
  const ELEMENT_WIDTH = 175;
  const LEEWAY_MARGIN = 5;
  const TARGET_AREA_RADIUS = 25;
  const TARGET_AREA_BORDER = 2;

  const normalizeYCoordinate = () => {
    if (
      // click near the bottom border of the image
      imagePosition.y + TARGET_AREA_RADIUS + TARGET_AREA_BORDER >
      gameData.imageDimensions.height - LEEWAY_MARGIN
    ) {
      return (
        imageBorder.bottom -
        ELEMENT_HEIGHT -
        TARGET_AREA_RADIUS -
        TARGET_AREA_BORDER -
        LEEWAY_MARGIN
      );
    } else if (
      imagePosition.y + ELEMENT_HEIGHT >
      gameData.imageDimensions.height - LEEWAY_MARGIN
    ) {
      return clickPosition.y - ELEMENT_HEIGHT;
    } else if (
      // click near the top border of the image
      imagePosition.y - TARGET_AREA_RADIUS - TARGET_AREA_BORDER <
      0 + LEEWAY_MARGIN
    ) {
      return (
        imageBorder.top +
        TARGET_AREA_RADIUS +
        TARGET_AREA_BORDER +
        LEEWAY_MARGIN
      );
    } else if (
      // click near the bottom edge of the visual viewport
      VIEWPORT_HEIGHT +
        window.visualViewport.offsetTop -
        clientPosition.y -
        ELEMENT_HEIGHT <
      0 + 3 * LEEWAY_MARGIN
    ) {
      return clickPosition.y - ELEMENT_HEIGHT;
    }
    return clickPosition.y;
  };

  const normalizeXCoordinate = () => {
    if (
      // click near the right border of the image
      imagePosition.x + TARGET_AREA_RADIUS + TARGET_AREA_BORDER >
      gameData.imageDimensions.width - LEEWAY_MARGIN
    ) {
      return (
        imageBorder.right -
        ELEMENT_WIDTH -
        TARGET_AREA_RADIUS -
        TARGET_AREA_BORDER -
        LEEWAY_MARGIN
      );
    } else if (
      imagePosition.x + ELEMENT_WIDTH >
      gameData.imageDimensions.width - LEEWAY_MARGIN
    ) {
      return clickPosition.x - ELEMENT_WIDTH;
    } else if (
      // click near the left border of the image
      imagePosition.x - TARGET_AREA_RADIUS - TARGET_AREA_BORDER <
      0 + LEEWAY_MARGIN
    ) {
      return (
        imageBorder.left +
        TARGET_AREA_RADIUS +
        TARGET_AREA_BORDER +
        LEEWAY_MARGIN
      );
    } else if (
      // click near the right edge of the visual viewport
      VIEWPORT_WIDTH +
        window.visualViewport.pageLeft -
        clickPosition.x -
        ELEMENT_WIDTH <
      0 + LEEWAY_MARGIN
    ) {
      return clickPosition.x - ELEMENT_WIDTH;
    }
    return clickPosition.x;
  };

  return (
    <div
      data-testid="dropdown-menu"
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
