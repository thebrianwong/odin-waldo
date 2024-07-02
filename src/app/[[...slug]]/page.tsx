import Link from "next/link";
import { ClientOnly } from "./client";
import logo from "../../../public/assets/images/misc/logo.png";
import GameVersionCard from "src/components/GameVersionCard/GameVersionCard";
import "../../styles/styles.scss";
import gameData from "../../gameData.json";

export function generateStaticParams() {
  return [{ slug: [""] }];
}

// export default function Page() {
//   return <ClientOnly />;
// }

export default function HomePage() {
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
        <Link href="/game/normal">
          <GameVersionCard
            difficulty="Normal"
            gameData={gameData.version1}
            gameVersion="version1"
            chooseGameVersion={() => console.log("moneky kong")}
          />
        </Link>
        <Link href="/game/hard">
          <GameVersionCard
            difficulty="Hard"
            gameData={gameData.version2}
            gameVersion="version2"
            chooseGameVersion={() => console.log("moneky kong")}
          />
        </Link>
        <Link href="/game/weird">
          <GameVersionCard
            difficulty="Weird"
            gameData={gameData.version3}
            gameVersion="version3"
            chooseGameVersion={() => console.log("moneky kong")}
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
}
