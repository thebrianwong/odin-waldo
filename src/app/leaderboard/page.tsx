import { LeaderboardTotal } from "src/types/leaderboardData.type";
import { formatLeaderboardDates } from "src/utils";
import Leaderboard from "src/pages/Leaderboard/Leaderboard";

interface LeaderboardPageProps {
  searchParams: {
    gameVersion: string;
  };
}

export default async function LeaderboardPage({
  searchParams,
}: LeaderboardPageProps) {
  const getLeaderboardData = async () => {
    try {
      const rawLeaderboardData = (await fetch(
        `${process.env.NEXT_PUBLIC_API_GATEWAY_HTTPS_ENDPOINT}/leaderboard`,
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY!,
          },
          cache: "no-store",
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

  const data = await getLeaderboardData();

  return (
    <Leaderboard
      leaderboardData={data as LeaderboardTotal}
      difficulty={searchParams.gameVersion}
    />
  );
}
