import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Homepage from "./pages/Homepage/Homepage";
import Game from "./pages/Game/Game";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import data from "./gameData.json";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  DocumentData,
  getDoc,
  getFirestore,
  onSnapshot,
  query,
  Timestamp,
} from "firebase/firestore";
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

function App() {
  const gameData = data as GameData;

  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
  const locationsRef = doc(db, "pokemon-locations", "c7mMQDMECrbbBIQ7HxlC");
  const version1Query = query(collectionGroup(db, "leaderboard-version1"));
  const version2Query = query(collectionGroup(db, "leaderboard-version2"));
  const version3Query = query(collectionGroup(db, "leaderboard-version3"));

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
    const getLeaderboardData = () => {
      const leaderboardQuery = [version1Query, version2Query, version3Query];
      const leaderboardScoresData = {} as LeaderboardTotal;
      leaderboardQuery.forEach((versionQuery, index) => {
        onSnapshot(versionQuery, (snapshot) => {
          const versionData: DocumentData[] = [];
          snapshot.docs.forEach((doc) => {
            const leaderboardEntry = doc.data();
            leaderboardEntry.timeStamp = leaderboardEntry.timeStamp
              .toDate()
              .toDateString();
            versionData.push(leaderboardEntry);
          });
          leaderboardScoresData[`version${index + 1}`] =
            versionData as Array<LeaderboardEntry>;
        });
      });
      setLeaderboardData(leaderboardScoresData as LeaderboardTotal);
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
    playerFavoritePokemon: string
  ) => {
    try {
      await addDoc(collection(db, `leaderboard-${gameVersion}`), {
        name: checkForEmptyName(playerName),
        score: timeInMilliseconds,
        favoritePokemon: checkForEmptyFavoritePokemon(playerFavoritePokemon),
        timeStamp: Timestamp.now(),
      });
      return true;
    } catch (e) {
      console.error("There was an error submitting your score. Try again!");
      return false;
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
            path="leaderboard"
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
