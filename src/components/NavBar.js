import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const intervalRef = useRef(null);
  useEffect(() => {
    setStartTime(Date.now());
    setEndTime(Date.now());
    const intervalId = setInterval(() => {
      setEndTime(Date.now());
    }, 75);
    intervalRef.current = intervalId;
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const elapsedTime = (endTime - startTime) / 1000;
  return (
    <div>
      {
        // Order: Link to Home, 3 sprites of the Pokemon to find, timer as the very middle, link to leaderboard
      }
      <Link to="/">
        <button>Home</button>
      </Link>
      <div>
        <img />
        <img />
        <img />
      </div>
      <div>
        <p>{`Time: ${elapsedTime} seconds`}</p>
      </div>
      <Link to="/leaderboard">
        <button>Leaderboard</button>
      </Link>
    </div>
  );
};

export default NavBar;
