import { Link } from "react-router-dom";

const NavBar = ({ gameData, gameProgress, elapsedTime }) => {
  const indicateIfFound = (pokemon) => {
    if (gameProgress[pokemon]) {
      return "0.35";
    }
  };

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
      <div>
        {gameData.pokemonNames.map((pokemon) => {
          return (
            <img
              style={{
                opacity: indicateIfFound(pokemon),
              }}
              key={pokemon}
              src={require(`../assets/images/navbar_sprites/${pokemon}_navbar_sprite.png`)}
              alt={`The sprite of ${pokemon} as it appears as an opposing Pokemon in Pokemon HeartGold and SoulSilver.`}
            />
          );
        })}
      </div>
      <div>
        <p>{`Time: ${elapsedTime}`}</p>
      </div>
      <Link to="/leaderboard">
        <button>Leaderboard</button>
      </Link>
    </nav>
  );
};

export default NavBar;
