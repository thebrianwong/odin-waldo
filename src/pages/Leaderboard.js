import { useState } from "react";

const Leaderboard = ({ leaderboardData, formatTime }) => {
  const [gameVersion, setGameVersion] = useState("version1");
  return (
    <>
      {
        // Top left is title, indicating which game option
        // Top right is a drop down menu to pick between game options
        // Switching game options changes the title and the displayed leaderboard
        // Below is the main contents of the leaderboard scores
        // Each record has name, game time duration, and favorite Pokemon
      }
    </>
  );
};

export default Leaderboard;
