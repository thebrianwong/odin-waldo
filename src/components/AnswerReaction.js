const AnswerReaction = ({ isCorrect, clickPosition }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: clickPosition.y,
        left: clickPosition.x,
      }}
    >
      {isCorrect ? (
        <img src={require("../assets/images/correct.png")} />
      ) : (
        <img src={require("../assets/images/incorrect.png")} />
      )}
    </div>
  );
};

export default AnswerReaction;
