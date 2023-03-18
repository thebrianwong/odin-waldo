import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Homepage from "./pages/Homepage";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";
import { gameData as data } from "./gameData";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getFirebaseConfig } from "./firebase-config";

function App() {
  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const docRef = doc(db, "pokemon-locations", "c7mMQDMECrbbBIQ7HxlC");

  const [gameVersion, setGameVersion] = useState("version1");
  const [validationData, setValidationData] = useState(null);
  const gameData = data;

  useEffect(() => {
    const getValidationData = async () => {
      const docSnap = await getDoc(docRef);
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
                />
              ) : null /* put a loading screen with a spinning pokeball */
            }
          />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
