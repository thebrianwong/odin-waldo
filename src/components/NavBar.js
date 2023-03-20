import { Link } from "react-router-dom";

const NavBar = ({ gameData, elapsedTime }) => {
  return (
    <div>
      {
        // Order: Link to Home, 3 sprites of the Pokemon to find, timer as the very middle, link to leaderboard
      }
      <Link to="/">
        <button>Home</button>
      </Link>
      <div>
        {gameData.pokemonNames.map((pokemon) => {
          console.log(pokemon);
          return (
            <img
              key={pokemon}
              src={require(`../assets/images/navbar_sprites/${pokemon}_navbar_sprite.png`)}
            />
          );
        })}
      </div>
      <div>
        <p>{`Time: ${elapsedTime}`}</p>
      </div>
      <Link to="/leaderboard">
        <button>Leaderboard</button>
      </Link>
    </div>
  );
};

export default NavBar;
