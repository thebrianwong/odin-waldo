const TargetArea = ({
  imagePosition,
  clickPosition,
  imageBorders,
  imageDimensions,
}) => {
  const AREA_HEIGHT = 50;
  const AREA_WIDTH = 50;
  const AREA_RADIUS = 25;
  const AREA_BORDER = 2;
  const LEEWAY_MARGIN = 5;
  const normalizeYCoordinate = () => {
    if (imagePosition.y + AREA_RADIUS > imageDimensions.height) {
      return (
        imageBorders.bottom - 2 * AREA_RADIUS - AREA_BORDER - LEEWAY_MARGIN
      );
    } else if (imagePosition.y - AREA_RADIUS < 0) {
      return imageBorders.top + AREA_BORDER + LEEWAY_MARGIN;
    }
    return clickPosition.y - AREA_RADIUS;
  };
  const normalizeXCoordinate = () => {
    // if (clientPosition.x + MENU_WIDTH > VIEWPORT_WIDTH - LEEWAY_MARGIN) {
    //   return clickPosition.x - MENU_WIDTH;
    // }
    return clickPosition.x;
  };
  return (
    <div
      style={{
        position: "absolute",
        top: normalizeYCoordinate(),
        left: clickPosition.x - 25,
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
