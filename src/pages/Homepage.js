import { useEffect } from "react";
import { Link } from "react-router-dom";
import GameVersionCard from "../components/GameVersionCard";

const Homepage = ({ gameData, chooseGameVersion }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div data-testid="homepage">
      <Link to="/leaderboard">
        <button className="nav-button">Leaderboard</button>
      </Link>
      <header>
        <img
          style={{ width: "50vw" }}
          src={require("../assets/images/misc/logo.png")}
          alt="The original Pokemon logo with a styled font, dark blue outline, and yellow fill."
        />
        <p className="slogan">Gotta find 'em all!</p>
      </header>
      <main>
        <Link to="/game">
          <GameVersionCard
            difficulty="Normal"
            gameData={gameData.version1}
            gameVersion="version1"
            chooseGameVersion={chooseGameVersion}
          />
        </Link>
        <Link to="/game">
          <GameVersionCard
            difficulty="Hard"
            gameData={gameData.version2}
            gameVersion="version2"
            chooseGameVersion={chooseGameVersion}
          />
        </Link>
        <Link to="/game">
          <GameVersionCard
            difficulty="Weird"
            gameData={gameData.version3}
            gameVersion="version3"
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
          . Favicon by{" "}
          <a href="https://www.deviantart.com/davi-1">Davi Andrade</a>.
        </p>
      </footer>
    </div>
  );
};

export default Homepage;
