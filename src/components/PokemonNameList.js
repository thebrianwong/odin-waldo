const PokemonNameList = ({ gameData, gameVersion, handlePickedOption }) => {
  return (
    <ul>
      {gameData.map((data) => {
        return (
          <li
            onClick={() => handlePickedOption(data)}
            key={`${gameVersion} ${data}`}
          >
            <img />
            <p>{data}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default PokemonNameList;
