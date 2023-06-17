type LeaderboardEntry = {
  favoritePokemon: string;
  name: string;
  score: number;
  timeStamp: string;
};

type LeaderboardTotal = {
  [version: string]: Array<LeaderboardEntry>;
};

export { LeaderboardEntry, LeaderboardTotal };
