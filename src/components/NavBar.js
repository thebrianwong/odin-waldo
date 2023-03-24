import { Link } from "react-router-dom";

const NavBar = ({ gameData, gameProgress, elapsedTime }) => {
  const indicateIfFound = (pokemon) => {
    if (gameProgress[pokemon]) {
      return "0.35";
    }
  };

  return (
    <nav>
      {
        // Order: Link to Home, 3 sprites of the Pokemon to find, timer as the very middle, link to leaderboard
      }
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
