import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Homepage from "./pages/Homepage/Homepage";
import Game from "./pages/Game/Game";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import data from "./gameData.json";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirebaseConfig } from "./firebase-config";
import LoadingPokeball from "./components/LoadingPokeball/LoadingPokeball";
import "./styles/styles.scss";
import { TotalValidationData } from "./types/validationData.type";
import { LeaderboardTotal } from "./types/leaderboardData.type";
import { GameData } from "./types/pokemonData.type";
import GameVersion from "./types/gameVersion.type";
import SubmissionResponse from "./types/submissionResponse.type";

function App() {
  const gameData = data as GameData;

  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const [gameVersion, setGameVersion] = useState<GameVersion>("version1");
  const [validationData, setValidationData] =
    useState<TotalValidationData | null>(null);
  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardTotal | null>(null);
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    try {
      if (!websocket) {
        const leaderboardWebsocket = new WebSocket(
          process.env.REACT_APP_API_GATEWAY_WSS_ENDPOINT!
        );
        setWebsocket(leaderboardWebsocket);
        leaderboardWebsocket.addEventListener(
          "message",
          async (newLeaderboardData) => {
            const parsedLeaderboardData: LeaderboardTotal = await JSON.parse(
              newLeaderboardData.data
            );
            const formattedLeaderboardData = formatLeaderboardDates(
              parsedLeaderboardData
            );
            setLeaderboardData(formattedLeaderboardData);
          }
        );
      }
    } catch (err) {
      console.error(
        "There was an error loading the game. Try refreshing the page!"
      );
    }
  }, []);

  useEffect(() => {
    const getValidationData = async () => {
      try {
        const rawValidationData = await fetch(
          `${process.env.REACT_APP_API_GATEWAY_HTTPS_ENDPOINT}/location`,
          {
            headers: {
              "x-api-key": process.env.REACT_APP_X_API_KEY!,
            },
          }
        );
        const parsedValidationData: TotalValidationData =
          await rawValidationData.json();
        setValidationData(parsedValidationData);
      } catch (err) {
        console.log(err);
        console.error(
          "There was an error loading the game. Try refreshing the page!"
        );
      }
    };
    getValidationData();
  }, []);

  useEffect(() => {
    const getLeaderboardData = async () => {
      try {
        const rawLeaderboardData = await fetch(
          `${process.env.REACT_APP_API_GATEWAY_HTTPS_ENDPOINT}/leaderboard`,
          {
            headers: {
              "x-api-key": process.env.REACT_APP_X_API_KEY!,
            },
          }
        );
        const parsedLeaderboardData: LeaderboardTotal =
          await rawLeaderboardData.json();
        const formattedLeaderboardData = formatLeaderboardDates(
          parsedLeaderboardData
        );
        setLeaderboardData(formattedLeaderboardData);
      } catch (err) {
        console.error(
          "There was an error loading the game. Try refreshing the page!"
        );
      }
    };
    getLeaderboardData();
  }, []);

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

  const formatTime = (timeInMilliseconds: number) => {
    const timeInSeconds = Math.round(timeInMilliseconds / 1000);
    if (timeInSeconds < 60) {
      if (timeInSeconds < 10) {
        return `00:0${timeInSeconds}`;
      }
      return `00:${timeInSeconds}`;
    } else {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;
      if (minutes < 10) {
        if (seconds < 10) {
          return `0${minutes}:0${seconds}`;
        }
        return `0${minutes}:${seconds}`;
      } else {
        if (seconds < 10) {
          return `${minutes}:0${seconds}`;
        }
        return `${minutes}:${seconds}`;
      }
    }
  };

  const checkForEmptyName = (name: string) => {
    if (name === "") {
      return "Anonymous Trainer";
    }
    return name;
  };

  const checkForEmptyFavoritePokemon = (favoritePokemon: string) => {
    if (favoritePokemon === "") {
      return "Missingno";
    }
    return favoritePokemon;
  };

  const submitScore = async (
    timeInMilliseconds: number,
    playerName: string,
    playerFavoritePokemon: string,
    gameVersion: GameVersion
  ): Promise<SubmissionResponse> => {
    try {
      const data = {
        name: checkForEmptyName(playerName),
        score: timeInMilliseconds,
        favoritePokemon: checkForEmptyFavoritePokemon(playerFavoritePokemon),
        gameVersion,
      };
      const scoreSubmission = await fetch(
        `${process.env.REACT_APP_API_GATEWAY_HTTPS_ENDPOINT}/leaderboard`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.REACT_APP_X_API_KEY!,
          },
          body: JSON.stringify(data),
        }
      );
      const parsedResponse: SubmissionResponse = await scoreSubmission.json();
      return parsedResponse;
    } catch (e) {
      console.error("There was an error submitting your score. Try again!");
      return {
        success: false,
        message: ["There is an error with the server. Please try again!"],
      };
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Homepage
                gameData={gameData}
                chooseGameVersion={setGameVersion}
              />
            }
          />
          <Route
            path="/game"
            element={
              validationData ? (
                <Game
                  gameData={gameData[gameVersion]}
                  gameVersion={gameVersion}
                  validationData={validationData[gameVersion]}
                  formatTime={formatTime}
                  submitScore={submitScore}
                />
              ) : (
                <LoadingPokeball />
              )
            }
          />
          <Route
            path="/leaderboard"
            element={
              leaderboardData && Object.keys(leaderboardData).length > 0 ? (
                <Leaderboard
                  leaderboardData={leaderboardData}
                  initialGameVersion={gameVersion}
                  formatTime={formatTime}
                />
              ) : (
                <LoadingPokeball />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
