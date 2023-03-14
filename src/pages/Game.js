import { useEffect, useRef, useState } from "react";
import DropdownMenu from "../components/DropdownMenu";
import NavBar from "../components/NavBar";
import TargetArea from "../components/TargetArea";

const Game = ({ gameData, gameVersion }) => {
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const intervalRef = useRef(null);
  const [displayingMenu, setDisplayingMenu] = useState(false);
  const [imageCoordinates, setImageCoordinates] = useState({
    x: null,
    y: null,
  });
  const [clickCoordinates, setClickCoordinates] = useState({
    x: null,
    y: null,
  });
  useEffect(() => {
    setStartTime(Date.now());
    setCurrentTime(Date.now());
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    intervalRef.current = intervalId;
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const formatElapsedTime = () => {
    const elapsedTime = Math.round((currentTime - startTime) / 1000);
    if (elapsedTime < 60) {
      if (elapsedTime < 10) {
        return `00:0${elapsedTime}`;
      }
      return `00:${elapsedTime}`;
    } else {
      const timeMinutes = Math.floor(elapsedTime / 60);
      const timeSeconds = elapsedTime - timeMinutes * 60;
      if (timeMinutes < 10) {
        if (timeSeconds < 10) {
          return `0${timeMinutes}:0${timeSeconds}`;
        }
        return `0${timeMinutes}:${timeSeconds}`;
      } else {
        if (timeSeconds < 10) {
          return `${timeMinutes}:0${timeSeconds}`;
        }
        return `${timeMinutes}:${timeSeconds}`;
      }
    }
  };
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
      <NavBar elapsedTime={formatElapsedTime()} />
      <div>
        <img
          onClick={(e) => handleImageClick(e)}
          src="https://wallpaper.dog/large/743396.jpg"
          alt="placeholder"
        />
      </div>
      {displayingMenu ? (
        <>
          <TargetArea position={clickCoordinates} />
          <DropdownMenu
            position={clickCoordinates}
            gameData={gameData}
            gameVersion={gameVersion}
            handlePickedOption={handlePickedOption}
          />
        </>
      ) : null}
    </div>
  );
};

export default Game;
