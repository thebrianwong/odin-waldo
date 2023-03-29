import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Leaderboard = ({ leaderboardData, initialGameVersion, formatTime }) => {
  const [gameVersion, setGameVersion] = useState(initialGameVersion);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const difficultyLabel = () => {
    if (gameVersion === "version1") {
      return "Normal";
    } else if (gameVersion === "version2") {
      return "Hard";
    } else {
      return "Weird";
    }
  };

  const sortedLeaderboardData = () => {
    return leaderboardData[gameVersion].sort((a, b) => {
      return a.score - b.score;
    });
  };

  return (
    <div className="leaderboard-page" data-testid="leaderboard">
      <Link to="/">
        <img
          className="pokemon-logo"
          src={require("../assets/images/misc/logo.png")}
          alt="The original Pokemon logo with a styled font, dark blue outline, and yellow fill."
        />
      </Link>
      <main className="leaderboard-contents">
        <div className="leaderboard-difficulty-container">
          <h1>{difficultyLabel()}</h1>
          <label className="leaderboard-difficulty-select" htmlFor="difficulty">
            Change difficulty: {""}
            <select
              data-testid="select-menu"
              onChange={(e) => setGameVersion(e.target.value)}
              name="difficulty"
              id="difficulty"
              value={gameVersion}
            >
              <option value="version1">Normal</option>
              <option value="version2">Hard</option>
              <option value="version3">Weird</option>
            </select>
          </label>
        </div>
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
              {sortedLeaderboardData().map((entry, index) => {
                return (
                  <tr key={index}>
                    <td>#{index + 1}</td>
                    <td>{entry.name}</td>
                    <td>{formatTime(entry.score)}</td>
                    <td>{entry.favoritePokemon}</td>
                    <td>{entry.timeStamp}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
