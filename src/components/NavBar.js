import { Link } from "react-router-dom";

const NavBar = ({ gameData, gameProgress, elapsedTime }) => {
  const indicateIfFound = (pokemon) => {
    if (gameProgress[pokemon]) {
      return "0.35";
    }
  };

  return (
    <nav className="game-navbar">
      <Link to="/">
        <button className="nav-button nav-home">Home</button>
      </Link>
      <div className="game-navbar-sprite-container">
        {gameData.pokemonNames.map((pokemon) => {
          return (
            <img
              className="game-navbar-sprite"
              style={{
                opacity: indicateIfFound(pokemon),
              }}
              key={`Nav-${pokemon}`}
              src={require(`../assets/images/navbar_sprites/${pokemon}_navbar_sprite.png`)}
              alt={`The sprite of ${pokemon} as it appears as an opposing Pokemon in Pokemon HeartGold and SoulSilver.`}
            />
          );
        })}
      </div>
      <div className="nav-timer">
        <p>{`Time: ${elapsedTime}`}</p>
      </div>
      <Link to="/leaderboard">
        <button className="nav-button nav-leaderboard">Leaderboard</button>
      </Link>
    </nav>
  );
};

export default NavBar;
