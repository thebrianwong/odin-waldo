const PokemonNameList = ({ gameData, handlePickedOption }) => {
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
      {gameData.pokemonNames.map((pokemon) => {
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
                handlePickedOption(e, pokemon);
              }
            }}
            key={`List-${pokemon}`}
          >
            <img
              src={require(`../assets/images/list_sprites/${pokemon}_list_sprite.png`)}
              alt={`The menu sprite of ${pokemon} from the Generation 3 and 4 Pokemon games.`}
            />
            <p style={{ margin: "0" }}>{pokemon}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default PokemonNameList;
