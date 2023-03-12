import { Link } from "react-router-dom";

const NavBar = () => {
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
        <p>Time: </p>
      </div>
      <Link to="/leaderboard">
        <button>Leaderboard</button>
      </Link>
    </div>
  );
};

export default NavBar;
