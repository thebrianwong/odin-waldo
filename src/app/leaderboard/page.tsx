import Link from "next/link";
import logo from "../../../public/assets/images/misc/logo.png";
import LeaderboardHeader from "../../components/LeaderboardHeader";
import LeaderboardContents from "src/components/LeaderboardContents";

interface LeaderboardPageProps {
  searchParams: {
    gameVersion: string;
  };
}

export default function LeaderboardPage({
  searchParams,
}: LeaderboardPageProps) {
  return (
    <div className="leaderboard-page" data-testid="leaderboard">
      <Link className="nav-button-container" href="/">
        <button className="nav-button">Home</button>
      </Link>
      <header>
        <a href="https://www.youtube.com/watch?v=fCkeLBGSINs">
          <img
            className="pokemon-logo"
            src={logo.src}
            alt="The original Pokemon logo with a styled font, dark blue outline, and yellow fill."
          />
        </a>
      </header>
      <main className="leaderboard-contents">
        <LeaderboardHeader />
        <div className="leaderboard-score-table-container">
          <table className="leaderboard-score-table">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Trainer Name</th>
                <th scope="col">Time</th>
                <th scope="col">Favorite Pokemon</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            {/* @ts-expect-error Server Component */}
            <LeaderboardContents difficulty={searchParams.gameVersion} />
          </table>
        </div>
      </main>
    </div>
  );
}
