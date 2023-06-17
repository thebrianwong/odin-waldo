import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeaderboardProps from "./type";
import GameVersion from "../../types/gameVersion.type";

const Leaderboard = ({
  leaderboardData,
  initialGameVersion,
  formatTime,
}: LeaderboardProps) => {
  const [gameVersion, setGameVersion] =
    useState<GameVersion>(initialGameVersion);

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
      <Link className="nav-button-container" to="/">
        <button className="nav-button">Home</button>
      </Link>
      <header>
        <a href="https://www.youtube.com/watch?v=fCkeLBGSINs">
          <img
            className="pokemon-logo"
            src={require("../../assets/images/misc/logo.png")}
            alt="The original Pokemon logo with a styled font, dark blue outline, and yellow fill."
          />
        </a>
      </header>
      <main className="leaderboard-contents">
        <div className="leaderboard-difficulty-container">
          <h1>{difficultyLabel()}</h1>
          <label
            className="leaderboard-difficulty-select-label"
            htmlFor="difficulty"
          >
            Change difficulty: {""}
            <select
              className="leaderboard-difficulty-select"
              data-testid="select-menu"
              onChange={(e: ChangeEvent) =>
                setGameVersion(
                  (e.target as HTMLOptionElement).value as GameVersion
                )
              }
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
