const TargetArea = ({ position }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: position.y - 10,
        left: position.x - 10,
        height: "20px",
        width: "20px",
        border: "dashed 1.5px darkgray",
        borderRadius: "20px",
        backgroundColor: "lightgray",
        opacity: "0.5",
      }}
    ></div>
  );
};

export default TargetArea;
