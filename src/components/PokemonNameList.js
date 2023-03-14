const PokemonNameList = ({ gameData, gameVersion, handlePickedOption }) => {
  return (
    <ul style={{ padding: "0", margin: "0" }}>
      {gameData.map((data) => {
        return (
          <li
            style={{ display: "flex", height: "35px" }}
            onClick={() => handlePickedOption(data)}
            key={`${gameVersion} ${data}`}
          >
            <img />
            <p style={{ margin: "0" }}>{data}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default PokemonNameList;
