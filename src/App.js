import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Homepage from "./pages/Homepage";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";

function App() {
  const [gameVersion, setGameVersion] = useState("version1");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Homepage chooseGameVersion={setGameVersion} />}
          />
          <Route path="/game" element={<Game gameVersion={gameVersion} />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
