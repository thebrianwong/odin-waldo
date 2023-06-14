import FormatTime from "../../types/formatTime.type";
import GameVersion from "../../types/gameVersion.type";
import { Leaderboard } from "../../types/leaderboardData.type";

type LeaderboardProps = {
  leaderboardData: Leaderboard;
  initialGameVersion: GameVersion;
  formatTime: FormatTime;
};

export default LeaderboardProps;
