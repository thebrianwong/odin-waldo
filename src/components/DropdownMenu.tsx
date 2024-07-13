import PokemonNameList from "./PokemonNameList";
import Position from "../types/position.type";
import ImageBorder from "../types/imageBorder.type";
import { VersionData } from "../types/pokemonData.type";

interface DropdownMenuProps {
  imagePosition: Position;
  clickPosition: Position;
  clientPosition: Position;
  imageBorder: ImageBorder;
  gameData: VersionData;
  handlePickedOption: (
    e: React.MouseEvent<Element, MouseEvent>,
    pickedPokemon: string
  ) => void;
}

const DropdownMenu = ({
  imagePosition,
  clickPosition,
  clientPosition,
  imageBorder,
  gameData,
  handlePickedOption,
}: DropdownMenuProps) => {
  const VIEWPORT_HEIGHT = window.visualViewport!.height;
  const VIEWPORT_WIDTH = window.visualViewport!.width;
  const ELEMENT_HEIGHT = 150;
  const ELEMENT_WIDTH = 125;
  const BORDER_WIDTH = 2;
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
        BORDER_WIDTH -
        TARGET_AREA_RADIUS -
        TARGET_AREA_BORDER -
        LEEWAY_MARGIN
      );
    } else if (
      imagePosition.y + ELEMENT_HEIGHT >
      gameData.imageDimensions.height - LEEWAY_MARGIN
    ) {
      return clickPosition.y - ELEMENT_HEIGHT - BORDER_WIDTH;
    } else if (
      // click near the top border of the image
      imagePosition.y - TARGET_AREA_RADIUS - TARGET_AREA_BORDER <
      0 + LEEWAY_MARGIN
    ) {
      return (
        imageBorder.top +
        TARGET_AREA_RADIUS +
        TARGET_AREA_BORDER +
        BORDER_WIDTH +
        LEEWAY_MARGIN
      );
    } else if (
      // click near the bottom edge of the visual viewport
      VIEWPORT_HEIGHT +
        window.visualViewport!.offsetTop -
        clientPosition.y -
        ELEMENT_HEIGHT <
      0 + 3 * LEEWAY_MARGIN
    ) {
      return clickPosition.y - ELEMENT_HEIGHT - BORDER_WIDTH;
    }
    return clickPosition.y - BORDER_WIDTH;
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
        BORDER_WIDTH -
        TARGET_AREA_RADIUS -
        TARGET_AREA_BORDER -
        LEEWAY_MARGIN
      );
    } else if (
      imagePosition.x + ELEMENT_WIDTH >
      gameData.imageDimensions.width - LEEWAY_MARGIN
    ) {
      return clickPosition.x - ELEMENT_WIDTH - BORDER_WIDTH;
    } else if (
      // click near the left border of the image
      imagePosition.x - TARGET_AREA_RADIUS - TARGET_AREA_BORDER <
      0 + LEEWAY_MARGIN
    ) {
      return (
        imageBorder.left +
        TARGET_AREA_RADIUS +
        TARGET_AREA_BORDER +
        BORDER_WIDTH +
        LEEWAY_MARGIN
      );
    } else if (
      // click near the right edge of the visual viewport
      VIEWPORT_WIDTH +
        window.visualViewport!.pageLeft -
        clickPosition.x -
        ELEMENT_WIDTH <
      0 + LEEWAY_MARGIN
    ) {
      return clickPosition.x - ELEMENT_WIDTH - BORDER_WIDTH;
    }
    return clickPosition.x - BORDER_WIDTH;
  };
  return (
    <div
      className="dropdown-menu"
      data-testid="dropdown-menu"
      style={{
        top: normalizeYCoordinate(),
        left: normalizeXCoordinate(),
      }}
    >
      <PokemonNameList
        gameData={gameData}
        handlePickedOption={handlePickedOption}
      />
    </div>
  );
};

export default DropdownMenu;
