import { Link } from "react-router-dom";

const NavBar = ({ gameData, gameProgress, elapsedTime }) => {
  const indicateIfFound = (pokemon) => {
    if (gameProgress[pokemon]) {
      return "0.35";
    } else {
      return "1";
    }
  };
  return (
    <div>
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
    </div>
  );
};

export default NavBar;
