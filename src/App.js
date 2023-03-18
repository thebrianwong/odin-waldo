import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Homepage from "./pages/Homepage";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";
import { gameData as data } from "./gameData";
import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./firebase-config";

function App() {
  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);

  const [gameVersion, setGameVersion] = useState("version1");
  const gameData = data;
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
              <Game
                gameData={gameData[gameVersion]}
                gameVersion={gameVersion}
              />
            }
          />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
