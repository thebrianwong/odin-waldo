import Link from "next/link";
import { pokemonNavSprites } from "../app/assets";
import { VersionData } from "../types/pokemonData.type";
import GameProgress from "../types/gameProgress.type";

interface NavBarProps {
  gameData: VersionData;
  gameProgress: GameProgress;
  elapsedTime: string;
}

const NavBar = ({ gameData, gameProgress, elapsedTime }: NavBarProps) => {
  const indicateIfFound = (pokemon: string) => {
    if (gameProgress[pokemon]) {
      return "0.35";
    }
  };

  return (
    <nav className="game-navbar">
      <Link href="/">
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
      <Link href="/leaderboard">
        <button className="nav-button nav-leaderboard">Leaderboard</button>
      </Link>
    </nav>
  );
};

export default NavBar;
