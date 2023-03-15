const TargetArea = ({ position }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: position.y - 25,
        left: position.x - 25,
        height: "50px",
        width: "50px",
        border: "dashed 2px red",
        borderRadius: "100px",
        backgroundColor: "darkgray",
        opacity: "0.75",
      }}
    ></div>
  );
};

export default TargetArea;
