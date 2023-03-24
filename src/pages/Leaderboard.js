import { useState } from "react";
import { Link } from "react-router-dom";

const Leaderboard = ({ leaderboardData, initialGameVersion, formatTime }) => {
  const [gameVersion, setGameVersion] = useState(initialGameVersion);

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
    <div>
      {
        // Top left is title, indicating which game option
        // Top right is a drop down menu to pick between game options
        // Switching game options changes the title and the displayed leaderboard
        // Below is the main contents of the leaderboard scores
        // Each record has name, game time duration, and favorite Pokemon
      }
      <div>
        <Link to="/">
          <img
            style={{ width: "50vw" }}
            src={require("../assets/images/misc/logo.png")}
            alt="The original Pokemon logo with a styled font, dark blue outline, and yellow fill."
          />
        </Link>
        <main>
          <div>
            <h1>{difficultyLabel()}</h1>
            <label htmlFor="difficulty">
              Change difficulty: {""}
              <select
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
          <table>
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Trainer Name</th>
                <th scope="col">Time</th>
                <th scope="col">Favorite Pokemon</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
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
        </main>
      </div>
    </div>
  );
};

export default Leaderboard;
