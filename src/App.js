import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/game" element={<Game />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
