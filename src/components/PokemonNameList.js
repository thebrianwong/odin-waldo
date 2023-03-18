const PokemonNameList = ({ gameData, gameVersion, handlePickedOption }) => {
  return (
    <ul
      style={{
        padding: "0",
        margin: "0",
        height: "150px",
        width: "175px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {gameData.pokemonNames.map((data) => {
        return (
          <li
            style={{
              display: "flex",
              height: "35px",
              flex: "1",
              alignItems: "center",
            }}
            onClick={(e) => {
              if (handlePickedOption) {
                handlePickedOption(e, data);
              }
            }}
            key={`${gameVersion} ${data}`}
          >
            <img src={require("../assets/images/pikachu.png")} />
            <p style={{ margin: "0" }}>{data}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default PokemonNameList;
