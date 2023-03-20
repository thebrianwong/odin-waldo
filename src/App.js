import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState, version } from "react";
import Homepage from "./pages/Homepage";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";
import { gameData as data } from "./gameData";
import { initializeApp } from "firebase/app";
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import { getFirebaseConfig } from "./firebase-config";
import LoadingPokeball from "./components/LoadingPokeball";

function App() {
  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const locationsRef = doc(db, "pokemon-locations", "c7mMQDMECrbbBIQ7HxlC");
  const leaderboardRef = doc(db, "leaderboard", "aTP48l1FdA6uqGSRtxSW");
  const version1Query = query(collectionGroup(db, "leaderboard-version1"));
  const version2Query = query(collectionGroup(db, "leaderboard-version2"));
  const version3Query = query(collectionGroup(db, "leaderboard-version3"));

  const [gameVersion, setGameVersion] = useState("version1");
  const [validationData, setValidationData] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState(null);
  const gameData = data;

  useEffect(() => {
    const getValidationData = async () => {
      const docSnap = await getDoc(locationsRef);
      if (docSnap.exists()) {
        setValidationData(docSnap.data());
      } else {
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
      const leaderboardScoresData = {};
      leaderboardQuery.forEach(async (version, index) => {
        try {
          let versionData = [];
          const versionDocuments = await getDocs(version);
          versionDocuments.forEach((doc) => {
            const leaderboardEntry = doc.data();
            leaderboardEntry.timeStamp = leaderboardEntry.timeStamp
              .toDate()
              .toDateString();
            versionData = versionData.concat(leaderboardEntry);
          });
          leaderboardScoresData[`version${index + 1}`] = versionData;
          setLeaderboardData(leaderboardScoresData);
        } catch (e) {
          console.error(
            "Some leaderboard scores are missing. Try refreshing the page!"
          );
        }
      });
    };
    getLeaderboardData();
  }, []);
  const formatTime = (timeInMilliseconds) => {
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
  const submitScore = (
    timeInMilliseconds,
    playerName,
    playerFavoritePokemon
  ) => {
    // add to the leaderboard collection in Firebase a new object, {name: playerName, score: timeInMilliseconds, favoritePokemon: playerFavoritePokemon}
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
              ) /* put a loading screen with a spinning pokeball */
            }
          />
          <Route
            path="leaderboard"
            element={
              <Leaderboard
                leaderboardData={leaderboardData}
                formatTime={formatTime}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
