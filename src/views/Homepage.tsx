import Link from "next/link";
import GameVersionCard from "../components/GameVersionCard";
import logo from "../../public/assets/images/misc/logo.png";
import gameData from "../gameData.json";

const Home = () => {
  return (
    <div className="homepage" data-testid="homepage">
      <Link
        className="nav-button-container"
        href="/leaderboard?gameVersion=normal"
      >
        <button className="nav-button">Leaderboard</button>
      </Link>
      <header>
        <a href="https://www.youtube.com/watch?v=fCkeLBGSINs">
          <img
            className="pokemon-logo"
            src={logo.src}
            alt="The original Pokemon logo with a styled font, dark blue outline, and yellow fill."
          />
        </a>
        <p className="slogan">Gotta find 'em all!</p>
      </header>
      <div className="homepage-instructions">
        <h1>Instructions</h1>
        <p>1) Choose a level below.</p>
        <p>
          2) Find all 3 Pokemon hidden in the provided image.<br></br>
          Click or tap the image when you think you've found them.
        </p>
        <p>3) Optionally submit your score to the leaderboard.</p>
      </div>
      <main className="homepage-game-options-container">
        <Link href="/game?gameVersion=normal">
          <GameVersionCard
            difficulty="Normal"
            gameData={gameData.version1}
            gameVersion="version1"
          />
        </Link>
        <Link href="/game?gameVersion=hard">
          <GameVersionCard
            difficulty="Hard"
            gameData={gameData.version2}
            gameVersion="version2"
          />
        </Link>
        <Link href="/game?gameVersion=weird">
          <GameVersionCard
            difficulty="Weird"
            gameData={gameData.version3}
            gameVersion="version3"
          />
        </Link>
      </main>
      <footer className="credits">
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

export default Home;
