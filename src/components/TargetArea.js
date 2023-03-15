const TargetArea = ({ clickPosition, clientPosition }) => {
  const VIEWPORT_HEIGHT = window.visualViewport.height;
  const VIEWPORT_WIDTH = window.visualViewport.width;
  const AREA_HEIGHT = 50;
  const AREA_WIDTH = 50;
  const AREA_RADIUS = 25;
  const LEEWAY_MARGIN = 15;
  // const OFFSET_WIDTH = 25
  const normalizeYCoordinate = () => {
    console.log(
      clientPosition.y + AREA_RADIUS,
      VIEWPORT_HEIGHT - LEEWAY_MARGIN
    );
    if (clientPosition.y + AREA_RADIUS > VIEWPORT_HEIGHT - LEEWAY_MARGIN) {
      console.log("crossing");
      console.log(
        clientPosition.y + AREA_RADIUS - VIEWPORT_HEIGHT - LEEWAY_MARGIN
      );
      // return clickPosition.y - MENU_HEIGHT;
    }
    return clickPosition.y;
  };
  const normalizeXCoordinate = () => {
    // if (clientPosition.x + MENU_WIDTH > VIEWPORT_WIDTH - LEEWAY_MARGIN) {
    //   return clickPosition.x - MENU_WIDTH;
    // }
    return clickPosition.x;
  };
  normalizeYCoordinate();
  return (
    <div
      style={{
        position: "absolute",
        top: clickPosition.y - 25,
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
