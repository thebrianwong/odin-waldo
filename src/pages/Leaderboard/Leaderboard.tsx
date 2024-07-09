import Link from "next/link";
import LeaderboardProps from "./type";
import logo from "../../../public/assets/images/misc/logo.png";
import LeaderboardHeader from "../../components/LeaderboardHeader";
import LeaderboardContents from "../../components/LeaderboardContents";

const Leaderboard = ({ leaderboardData, difficulty }: LeaderboardProps) => {
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
            <LeaderboardContents
              data={leaderboardData}
              difficulty={difficulty}
            />
          </table>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
