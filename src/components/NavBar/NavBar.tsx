import { Link } from "react-router-dom";
import NavBarProps from "./type";
import { pokemonNavSprites } from "src/app/assets";

const NavBar = ({ gameData, gameProgress, elapsedTime }: NavBarProps) => {
  const indicateIfFound = (pokemon: string) => {
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
              src={pokemonNavSprites[pokemon]}
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
