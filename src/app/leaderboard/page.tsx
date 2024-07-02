import Link from "next/link";
import logo from "../../../public/assets/images/misc/logo.png";
import LeaderboardHeader from "../../components/LeaderboardHeader";

export default function LeaderboardPage() {
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
            <tbody data-testid="table-body">
              {/* {sortedLeaderboardData().map((entry, index) => {
                return (
                  <tr key={index}>
                    <td>#{index + 1}</td>
                    <td>{entry.name}</td>
                    <td>{formatTime(entry.score)}</td>
                    <td>{entry.favoritePokemon}</td>
                    <td>{entry.timeStamp}</td>
                  </tr>
                );
              })} */}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
