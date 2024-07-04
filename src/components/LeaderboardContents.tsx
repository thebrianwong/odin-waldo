import { LeaderboardTotal } from "src/types/leaderboardData.type";
import { difficultyToVersion, formatTime } from "src/utils";

interface LeaderboardContentsProps {
  difficulty: string;
}

export default async function LeaderboardContents({
  difficulty,
}: LeaderboardContentsProps) {
  const formatLeaderboardDates = (data: LeaderboardTotal) => {
    const formattedData = { ...data };
    const versions = Object.keys(formattedData);
    versions.forEach((version) => {
      const versionEntries = formattedData[version];
      versionEntries.forEach((entry) => {
        const utcTime = new Date(entry.timeStamp).toUTCString();
        const timeWithoutTimezone = utcTime.substring(0, 16);
        entry.timeStamp = timeWithoutTimezone;
      });
    });
    return formattedData;
  };

  const leaderboardData = async () => {
    try {
      const rawLeaderboardData = (await fetch(
        `${process.env.NEXT_PUBLIC_API_GATEWAY_HTTPS_ENDPOINT}/leaderboard`,
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY!,
          },
        }
      ).then((data) => data.json())) as LeaderboardTotal;
      const formattedLeaderboardData =
        formatLeaderboardDates(rawLeaderboardData);
      return formattedLeaderboardData;
    } catch (err) {
      console.error(
        "There was an error loading the game. Try refreshing the page!"
      );
    }
  };

  const data = await leaderboardData();

  return (
    <tbody data-testid="table-body">
      {data &&
        data[difficultyToVersion(difficulty)].map((entry, index) => {
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
  );
}
