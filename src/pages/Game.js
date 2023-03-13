import { useState } from "react";
import DropdownMenu from "../components/DropdownMenu";
import NavBar from "../components/NavBar";

const Game = ({ gameData, gameVersion }) => {
  const [displayingMenu, setDisplayingMenu] = useState(false);
  const [imageCoordinates, setImageCoordinates] = useState({
    x: null,
    y: null,
  });
  const [clickCoordinates, setClickCoordinates] = useState({
    x: null,
    y: null,
  });
  const handleImageClick = (e) => {
    setDisplayingMenu(!displayingMenu);
    if (displayingMenu) {
      setImageCoordinates({ x: null, y: null });
      setClickCoordinates({ x: null, y: null });
      return;
    }
    const imageXCoordinate = e.pageX - e.target.offsetLeft;
    const imageYCoordinate = e.pageY - e.target.offsetTop;
    const clickXCoordinate = e.pageX;
    const clickYCoordinate = e.pageY;
    console.log(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    console.log(e);
    setImageCoordinates({ x: imageXCoordinate, y: imageYCoordinate });
    setClickCoordinates({ x: clickXCoordinate, y: clickYCoordinate });
  };
  const handlePickedOption = (option) => {
    // based on chosen option, look at key of game data, compare with imageCoordinates, if within range mark checked, if not no checked
  };
  return (
    <div>
      <NavBar />
      <div>
        <img
          onClick={(e) => handleImageClick(e)}
          src="https://wallpaper.dog/large/743396.jpg"
          alt="placeholder"
        />
      </div>
      {displayingMenu ? (
        <DropdownMenu
          position={clickCoordinates}
          gameData={gameData}
          gameVersion={gameVersion}
          handlePickedOption={handlePickedOption}
        />
      ) : null}
    </div>
  );
};

export default Game;
