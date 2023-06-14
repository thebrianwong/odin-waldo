type LeaderboardEntry = {
  favoritePokemon: string;
  name: string;
  score: number;
  timeStamp: string;
};

type Leaderboard = {
  version1: Array<LeaderboardEntry>;
  version2: Array<LeaderboardEntry>;
  version3: Array<LeaderboardEntry>;
};

export { LeaderboardEntry, Leaderboard };
