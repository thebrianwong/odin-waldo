const TargetArea = ({
  imagePosition,
  clickPosition,
  imageBorder,
  gameData,
}) => {
  const AREA_RADIUS = 25;
  const BORDER_WIDTH = 2;
  const LEEWAY_MARGIN = 5;

  const normalizeYCoordinate = () => {
    if (
      imagePosition.y + AREA_RADIUS + BORDER_WIDTH >
      gameData.imageDimensions.height - LEEWAY_MARGIN
    ) {
      return (
        imageBorder.bottom - 2 * AREA_RADIUS - 2 * BORDER_WIDTH - LEEWAY_MARGIN
      );
    } else if (
      imagePosition.y - AREA_RADIUS - BORDER_WIDTH <
      0 + LEEWAY_MARGIN
    ) {
      return imageBorder.top + BORDER_WIDTH + LEEWAY_MARGIN;
    }
    return clickPosition.y - AREA_RADIUS - BORDER_WIDTH;
  };

  const normalizeXCoordinate = () => {
    if (
      imagePosition.x + AREA_RADIUS + BORDER_WIDTH >
      gameData.imageDimensions.width - LEEWAY_MARGIN
    ) {
      return (
        imageBorder.right - 2 * AREA_RADIUS - 2 * BORDER_WIDTH - LEEWAY_MARGIN
      );
    } else if (
      imagePosition.x - AREA_RADIUS - BORDER_WIDTH <
      0 + LEEWAY_MARGIN
    ) {
      return imageBorder.left + BORDER_WIDTH + LEEWAY_MARGIN;
    }
    return clickPosition.x - AREA_RADIUS - BORDER_WIDTH;
  };

  return (
    <div
      className="target-area"
      data-testid="target-area"
      style={{
        top: normalizeYCoordinate(),
        left: normalizeXCoordinate(),
      }}
    />
  );
};

export default TargetArea;
