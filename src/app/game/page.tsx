import Game from "src/pages/Game/Game";
import { TotalValidationData } from "src/types/validationData.type";
import { difficultyToVersion } from "src/utils";

interface GamePageProps {
  searchParams: {
    gameVersion: string;
  };
}

export default async function GamePage({ searchParams }: GamePageProps) {
  const { gameVersion } = searchParams;
  const formattedGameVersion = difficultyToVersion(gameVersion);

  const getValidationData = async () => {
    try {
      const validationData = (await fetch(
        `${process.env.NEXT_PUBLIC_API_GATEWAY_HTTPS_ENDPOINT}/location`,
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY!,
          },
        }
      ).then((data) => data.json())) as TotalValidationData;
      return validationData;
    } catch (err) {
      console.log(err);
      console.error(
        "There was an error loading the game. Try refreshing the page!"
      );
    }
  };

  const validationData = await getValidationData();

  return (
    <Game
      validationData={validationData as TotalValidationData}
      gameVersion={formattedGameVersion}
    />
  );
}
