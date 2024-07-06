import Link from "next/link";
import logo from "../../../public/assets/images/misc/logo.png";
import LeaderboardHeader from "../../components/LeaderboardHeader";
import LeaderboardContents from "src/components/LeaderboardContents";
import { Suspense } from "react";
import LoadingPokeball from "src/components/LoadingPokeball/LoadingPokeball";
import { LeaderboardTotal } from "src/types/leaderboardData.type";
import { formatLeaderboardDates } from "src/utils";

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
    <Suspense fallback={<LoadingPokeball />}>
      <div className="leaderboard-page" data-testid="leaderboard">
        <Link className="nav-button-container" href="/">
          <button className="nav-button">Home</button>
        </Link>
        <header>
          <a href="https://www.youtube.com/watch?v=fCkeLBGSINs">
            <img
              className="pokemon-logo"
              src={logo.src}
              alt="The original Pokemon logo with a styled font, dark blue outline, and yellow fill."
            />
          </a>
        </header>
        <main className="leaderboard-contents">
          <LeaderboardHeader />
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
              <LeaderboardContents
                data={data as LeaderboardTotal}
                difficulty={searchParams.gameVersion}
              />
            </table>
          </div>
        </main>
      </div>
    </Suspense>
  );
}
