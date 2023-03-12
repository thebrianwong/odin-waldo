import { Link } from "react-router-dom";
import GameVersionCard from "../components/GameVersionCard";

const Homepage = ({ chooseGameVersion }) => {
  return (
    <>
      <p>
        {
          // Button for leaderboard at the top right
          // Pokemon logo top middle, underneath is "Gotta find 'em all!"
          // Middle are the 3 game options
          // Each option has a tiny version of the image and a vertical bullet list of the 3 Pokemon to find
          // Each bullet list has the Gen 4 sprite of the Pokemon and its name
          // Bottom has credits
        }
      </p>
      <Link to="/leaderboard">
        <button>Leaderboard</button>
      </Link>
      <div>
        <p>Pokemon</p>
        <p>Gotta find 'em all!</p>
      </div>
      <div>
        <Link to="/game">
          <GameVersionCard
            gameVersion={"version1"}
            chooseGameVersion={chooseGameVersion}
          />
        </Link>
        <Link to="/game">
          <GameVersionCard
            gameVersion={"version2"}
            chooseGameVersion={chooseGameVersion}
          />
        </Link>
        <Link to="/game">
          <GameVersionCard
            gameVersion={"version3"}
            chooseGameVersion={chooseGameVersion}
          />
        </Link>
      </div>
    </>
  );
};

export default Homepage;
