const AnswerReaction = ({
  isCorrect,
  imagePosition,
  clickPosition,
  gameData,
}) => {
  const VIEWPORT_HEIGHT = window.visualViewport.height;
  const VIEWPORT_WIDTH = window.visualViewport.width;
  const ELEMENT_HEIGHT = 100;
  const ELEMENT_WIDTH = 100;
  const ELEMENT_BORDER_WIDTH = 5;
  const LEEWAY_MARGIN = 5;

  const backgroundColor = isCorrect
    ? "rgba(116,255,98,0.78)"
    : "rgba(255,98,116,0.78)";
  const borderColor = isCorrect ? "green" : "red";

  const normalizeYCoordinate = () => {
    if (
      // click near the bottom border of the image
      imagePosition.y + ELEMENT_HEIGHT + 2 * ELEMENT_BORDER_WIDTH >
        gameData.imageDimensions.height - LEEWAY_MARGIN ||
      // click near the bottom edge of the visual viewport
      VIEWPORT_HEIGHT +
        window.visualViewport.offsetTop -
        clickPosition.y -
        ELEMENT_HEIGHT -
        2 * ELEMENT_BORDER_WIDTH <
        0 + 3 * LEEWAY_MARGIN
    ) {
      return clickPosition.y - ELEMENT_HEIGHT - 2 * ELEMENT_BORDER_WIDTH;
    }
    return clickPosition.y;
  };

  const normalizeXCoordinate = () => {
    if (
      // click near the right border of the image
      imagePosition.x + ELEMENT_WIDTH + 2 * ELEMENT_BORDER_WIDTH >
        gameData.imageDimensions.width - LEEWAY_MARGIN ||
      // click near the right edge of the visual viewport
      VIEWPORT_WIDTH +
        window.visualViewport.pageLeft -
        clickPosition.x -
        ELEMENT_WIDTH -
        2 * ELEMENT_BORDER_WIDTH <
        0 + LEEWAY_MARGIN
    ) {
      return clickPosition.x - ELEMENT_WIDTH - 2 * ELEMENT_BORDER_WIDTH;
    }
    return clickPosition.x;
  };

  return (
    <div
      className="answer-reaction"
      data-testid="answer-reaction"
      style={{
        top: normalizeYCoordinate(),
        left: normalizeXCoordinate(),
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
    >
      {isCorrect ? (
        <img
          className="answer-reaction-image"
          src={require("../assets/images/answers/correct.png")}
          alt="Winking Pikachu posing with the V sign, indicating a correct answer."
        />
      ) : (
        <img
          className="answer-reaction-image"
          src={require("../assets/images/answers/incorrect.png")}
          alt="Frowning Pikachu making an X sign with its arms with a blue X behind it,
          indicating an incorrect answer."
        />
      )}
    </div>
  );
};

export default AnswerReaction;
