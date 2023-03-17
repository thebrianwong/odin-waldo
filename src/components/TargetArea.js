const TargetArea = ({
  imagePosition,
  clickPosition,
  imageBorder,
  imageDimensions,
}) => {
  const AREA_HEIGHT = 50;
  const AREA_WIDTH = 50;
  const AREA_RADIUS = 25;
  const AREA_HALF_BORDER = 1;
  const LEEWAY_MARGIN = 5;
  const normalizeYCoordinate = () => {
    if (
      imagePosition.y + AREA_RADIUS + AREA_HALF_BORDER >
      imageDimensions.height - LEEWAY_MARGIN
    ) {
      return (
        imageBorder.bottom -
        2 * AREA_RADIUS -
        2 * AREA_HALF_BORDER -
        LEEWAY_MARGIN
      );
    } else if (
      imagePosition.y - AREA_RADIUS - AREA_HALF_BORDER <
      0 + LEEWAY_MARGIN
    ) {
      return imageBorder.top + AREA_HALF_BORDER + LEEWAY_MARGIN;
    }
    return clickPosition.y - AREA_RADIUS - AREA_HALF_BORDER;
  };
  const normalizeXCoordinate = () => {
    if (
      imagePosition.x + AREA_RADIUS + AREA_HALF_BORDER >
      imageDimensions.width - LEEWAY_MARGIN
    ) {
      return (
        imageBorder.right -
        2 * AREA_RADIUS -
        2 * AREA_HALF_BORDER -
        LEEWAY_MARGIN
      );
    } else if (
      imagePosition.x - AREA_RADIUS - AREA_HALF_BORDER <
      0 + LEEWAY_MARGIN
    ) {
      return imageBorder.left + AREA_HALF_BORDER + LEEWAY_MARGIN;
    }
    return clickPosition.x - AREA_RADIUS - AREA_HALF_BORDER;
  };
  normalizeXCoordinate();
  return (
    <div
      style={{
        position: "absolute",
        top: normalizeYCoordinate(),
        left: normalizeXCoordinate(),
        height: `${AREA_HEIGHT}px`,
        width: `${AREA_WIDTH}px`,
        border: "dashed 2px red",
        borderRadius: "100px",
        backgroundColor: "darkgray",
        opacity: "0.75",
      }}
    ></div>
  );
};

export default TargetArea;
