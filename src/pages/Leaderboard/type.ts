import FormatTime from "../../types/formatTime.type";
import GameVersion from "../../types/gameVersion.type";
import { LeaderboardTotal } from "../../types/leaderboardData.type";

type LeaderboardProps = {
  leaderboardData: LeaderboardTotal;
  initialGameVersion: GameVersion;
  formatTime: FormatTime;
};

export default LeaderboardProps;
