const PokemonNameList = ({ gameData, handlePickedOption }) => {
  return (
    <ul className="name-list">
      {gameData.pokemonNames.map((pokemon) => {
        return (
          <li
            className="name-list-entry"
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
            <p>{pokemon}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default PokemonNameList;
