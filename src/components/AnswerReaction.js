const AnswerReaction = ({ isCorrect, clickPosition }) => {
  const bgColor = isCorrect ? "rgba(116,255,98,0.78)" : "rgba(255,98,116,0.78)";
  const brdColor = isCorrect ? "green" : "red";
  return (
    <div
      style={{
        position: "absolute",
        top: clickPosition.y,
        left: clickPosition.x,
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
          src={require("../assets/images/correct.png")}
        />
      ) : (
        <img
          style={{
            height: "100px",
            width: "100px",
          }}
          src={require("../assets/images/incorrect.png")}
        />
      )}
    </div>
  );
};

export default AnswerReaction;
