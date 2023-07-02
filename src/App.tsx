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
import {
  LeaderboardEntry,
  LeaderboardTotal,
} from "./types/leaderboardData.type";
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
        const leaderboardWebsocket = new WebSocket("ws://localhost:3000/");
        setWebsocket(leaderboardWebsocket);
        leaderboardWebsocket.addEventListener(
          "message",
          async (newLeaderboardData) => {
            const parsedLeaderboardData: LeaderboardTotal = await JSON.parse(
              newLeaderboardData.data
            );
            setLeaderboardData(parsedLeaderboardData);
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
          "http://localhost:3000/api/pokemonLocation"
        );
        const parsedValidationData: TotalValidationData =
          await rawValidationData.json();
        setValidationData(parsedValidationData);
      } catch (err) {
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
          "http://localhost:3000/api/leaderboard"
        );
        const parsedLeaderboardData = await rawLeaderboardData.json();
        setLeaderboardData(parsedLeaderboardData);
      } catch (err) {
        console.error(
          "There was an error loading the game. Try refreshing the page!"
        );
      }
    };
    getLeaderboardData();
  }, []);

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
        score: timeInMilliseconds.toString(),
        favoritePokemon: checkForEmptyFavoritePokemon(playerFavoritePokemon),
        timeStamp: new Date().toISOString().toString(),
        gameVersion,
      };
      const bodyString = new URLSearchParams(data).toString();
      const scoreSubmission = await fetch(
        "http://localhost:3000/api/leaderboard/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: bodyString,
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
