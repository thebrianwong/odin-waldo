import { useEffect, useRef, useState } from "react";
import DropdownMenu from "../components/DropdownMenu";
import NavBar from "../components/NavBar";
import TargetArea from "../components/TargetArea";

const Game = ({ gameData, gameVersion, validationData }) => {
  const [gameProgress, setGameProgress] = useState({
    [gameData.pokemonNames[0]]: false,
    [gameData.pokemonNames[1]]: false,
    [gameData.pokemonNames[2]]: false,
  });
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const intervalRef = useRef(null);
  const [displayingMenu, setDisplayingMenu] = useState(false);
  // coordinates of the click relative to image, starts at top left corner of image
  const [imageCoordinates, setImageCoordinates] = useState({
    x: null,
    y: null,
  });
  // coordinates of the click relative to the entire page, starts at the top left corner of the page
  const [clickCoordinates, setClickCoordinates] = useState({
    x: null,
    y: null,
  });
  // coordinates of the click relative to the viewport, starts at the top left corner of what is being displayed
  const [clientCoordinates, setClientCoordinates] = useState({
    x: null,
    y: null,
  });
  // how far down or left from the page is each border of the image
  const [imageBorder, setImageBorder] = useState({
    top: null,
    right: null,
    bottom: null,
    left: null,
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
  useEffect(() => {
   if (checkIfAllPokemonFound()) {
      clearInterval(intervalRef.current);
      // display modal to submit score to leaderboard
    }
  }, [gameProgress]); 
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
      resetState();
      return;
    }
    const imageXCoordinate = e.pageX - e.target.offsetLeft;
    const imageYCoordinate = e.pageY - e.target.offsetTop;
    const clickXCoordinate = e.pageX;
    const clickYCoordinate = e.pageY;
    const clientXCoordinate = e.clientX;
    const clientYCoordinate = e.clientY;
    const imageBorderTop = e.target.offsetTop;
    const imageBorderRight = e.target.offsetLeft + e.target.offsetWidth;
    const imageBorderBottom = e.target.offsetTop + e.target.offsetHeight;
    const imageBorderLeft = e.target.offsetLeft;
    // console.log(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    console.log(e);
    // console.log(imageXCoordinate, imageYCoordinate);
    setImageCoordinates({ x: imageXCoordinate, y: imageYCoordinate });
    setClickCoordinates({ x: clickXCoordinate, y: clickYCoordinate });
    setClientCoordinates({ x: clientXCoordinate, y: clientYCoordinate });
    setImageBorder({
      top: imageBorderTop,
      right: imageBorderRight,
      bottom: imageBorderBottom,
      left: imageBorderLeft,
    });
  };
  const checkIfAllPokemonFound = () => {
    console.log(gameProgress);
    if (
      Object.keys(gameProgress).every((pokemon) => {
        if (gameProgress[pokemon] === true) {
          return true;
        }
        return false;
      })
    ) {
      return true;
    }
    return false;
  };
  const handlePickedOption = (pickedPokemon) => {
    // based on chosen option, look at key of game data, compare with imageCoordinates, if within range mark checked, if not no checked
    const pokemonCoordinates = validationData[pickedPokemon];
    if (
      imageCoordinates.x >= pokemonCoordinates.minimumX &&
      imageCoordinates.x <= pokemonCoordinates.maximumX &&
      imageCoordinates.y >= pokemonCoordinates.minimumY &&
      imageCoordinates.y <= pokemonCoordinates.maximumY
    ) {
      // flash green
      setGameProgress({ ...gameProgress, [pickedPokemon]: true });
      // mark the nav bar sprite as translucent
    } else {
      // flash red
    }
    setDisplayingMenu(!displayingMenu);
    resetState();
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
          <TargetArea
            imagePosition={imageCoordinates}
            clickPosition={clickCoordinates}
            imageBorder={imageBorder}
            gameData={gameData}
          />
          <DropdownMenu
            imagePosition={imageCoordinates}
            clickPosition={clickCoordinates}
            clientPosition={clientCoordinates}
            imageBorder={imageBorder}
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
