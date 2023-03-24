const AnswerReaction = ({
  isCorrect,
  imagePosition,
  clickPosition,
  gameData,
}) => {
  const VIEWPORT_HEIGHT = window.visualViewport.height;
  const VIEWPORT_WIDTH = window.visualViewport.width;
  const REACTION_HEIGHT = 100;
  const REACTION_WIDTH = 100;
  const REACTION_HALF_BORDER = 5;
  const LEEWAY_MARGIN = 5;

  const bgColor = isCorrect ? "rgba(116,255,98,0.78)" : "rgba(255,98,116,0.78)";
  const brdColor = isCorrect ? "green" : "red";

  const normalizeYCoordinate = () => {
    if (
      // click near the bottom border of the image
      imagePosition.y + REACTION_HEIGHT + 2 * REACTION_HALF_BORDER >
        gameData.imageDimensions.height - LEEWAY_MARGIN ||
      // click near the bottom edge of the visual viewport
      VIEWPORT_HEIGHT +
        window.visualViewport.offsetTop -
        clickPosition.y -
        REACTION_HEIGHT -
        2 * REACTION_HALF_BORDER <
        0 + 3 * LEEWAY_MARGIN
    ) {
      return clickPosition.y - REACTION_HEIGHT - 2 * REACTION_HALF_BORDER;
    }
    return clickPosition.y;
  };

  const normalizeXCoordinate = () => {
    if (
      // click near the right border of the image
      imagePosition.x + REACTION_WIDTH + 2 * REACTION_HALF_BORDER >
        gameData.imageDimensions.width - LEEWAY_MARGIN ||
      // click near the right edge of the visual viewport
      VIEWPORT_WIDTH +
        window.visualViewport.pageLeft -
        clickPosition.x -
        REACTION_WIDTH -
        2 * REACTION_HALF_BORDER <
        0 + LEEWAY_MARGIN
    ) {
      return clickPosition.x - REACTION_WIDTH - 2 * REACTION_HALF_BORDER;
    }
    return clickPosition.x;
  };

  return (
    <div
      style={{
        position: "absolute",
        top: normalizeYCoordinate(),
        left: normalizeXCoordinate(),
        height: "100px",
        width: "100px",
        backgroundColor: bgColor,
        borderStyle: "solid",
        borderWidth: "5px",
        borderColor: brdColor,
        borderRadius: "8px",
      }}
    >
      {isCorrect ? (
        <img
          style={{
            height: "100px",
            width: "100px",
          }}
          src={require("../assets/images/answers/correct.png")}
          alt="Winking Pikachu posing with the V sign, indicating a correct answer."
        />
      ) : (
        <img
          style={{
            height: "100px",
            width: "100px",
          }}
          src={require("../assets/images/answers/incorrect.png")}
          alt="Frowning Pikachu making an X sign with its arms with a blue X behind it,
          indicating an incorrect answer."
        />
      )}
    </div>
  );
};

export default AnswerReaction;
