import { Link } from "react-router-dom";
import GameVersionCard from "../components/GameVersionCard";

const Homepage = ({ gameData, chooseGameVersion }) => {
  return (
    <>
      <Link to="/leaderboard">
        <button>Leaderboard</button>
      </Link>
      <header>
        <img
          style={{ width: "50vw" }}
          src={require("../assets/images/misc/logo.png")}
          alt="The original Pokemon logo with a styled font, dark blue outline, and yellow fill."
        />
        <p>Gotta find 'em all!</p>
      </header>
      <main>
        <Link to="/game">
          <GameVersionCard
            difficulty="Normal"
            gameData={gameData.version1}
            gameVersion={"version1"}
            chooseGameVersion={chooseGameVersion}
          />
        </Link>
        <Link to="/game">
          <GameVersionCard
            difficulty="Hard"
            gameData={gameData.version2}
            gameVersion={"version2"}
            chooseGameVersion={chooseGameVersion}
          />
        </Link>
        <Link to="/game">
          <GameVersionCard
            difficulty="Weird"
            gameData={gameData.version3}
            gameVersion={"version3"}
            chooseGameVersion={chooseGameVersion}
          />
        </Link>
      </main>
      <footer>
        <p>
          All assets belong to Nintendo and Game Freak. Weird level image by{" "}
          <a href="http://www.burntheinternet.com/p/the-impostor-minineko-pokedex.html">
            Burn The Internet
          </a>
          .
        </p>
      </footer>
    </>
  );
};

export default Homepage;
