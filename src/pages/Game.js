import { useCallback, useEffect, useRef, useState } from "react";
import DropdownMenu from "../components/DropdownMenu";
import NavBar from "../components/NavBar";
import TargetArea from "../components/TargetArea";
import AnswerReaction from "../components/AnswerReaction";
import SubmitScoreModal from "../components/SubmitScoreModal";

const Game = ({
  gameData,
  gameVersion,
  validationData,
  formatTime,
  submitScore,
}) => {
  const elapsedTimeIntervalRef = useRef(null);
  const answerReactionTimerIdRef = useRef(null);

  const [gameProgress, setGameProgress] = useState({
    [gameData.pokemonNames[0]]: false,
    [gameData.pokemonNames[1]]: false,
    [gameData.pokemonNames[2]]: false,
  });

  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  // how far down or left from the page is each border of the image
  const [imageBorder, setImageBorder] = useState({
    top: null,
    right: null,
    bottom: null,
    left: null,
  });
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

  const [answerImageCoordinates, setAnswerImageCoordinates] = useState({
    x: null,
    y: null,
  });
  const [answerClickCoordinates, setAnswerClickCoordinates] = useState({
    x: null,
    y: null,
  });

  const [displayMenu, setDisplayMenu] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);

  const checkIfAllPokemonFound = useCallback(() => {
    if (
      Object.keys(gameProgress).every((pokemon) => {
        if (gameProgress[pokemon]) {
          return true;
        }
        return false;
      })
    ) {
      return true;
    }
    return false;
  }, [gameProgress]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setStartTime(Date.now());
    setCurrentTime(Date.now());
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    elapsedTimeIntervalRef.current = intervalId;
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (checkIfAllPokemonFound()) {
      clearInterval(elapsedTimeIntervalRef.current);
      setDisplayModal(true);
    }
  }, [gameProgress, checkIfAllPokemonFound]);

  useEffect(() => {
    if (isCorrectAnswer === null) {
      setAnswerImageCoordinates({
        x: null,
        y: null,
      });
      setAnswerClickCoordinates({
        x: null,
        y: null,
      });
    }
  }, [isCorrectAnswer]);

  const resetClickState = () => {
    setImageCoordinates({ x: null, y: null });
    setClickCoordinates({ x: null, y: null });
    setClientCoordinates({
      x: null,
      y: null,
    });
    setImageBorder({
      top: null,
      right: null,
      bottom: null,
      left: null,
    });
  };

  const handleImageClick = (e) => {
    setDisplayMenu(!displayMenu);
    if (displayMenu) {
      resetClickState();
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

  const handlePickedOption = (e, pickedPokemon) => {
    const pokemonCoordinates = validationData[pickedPokemon];
    if (
      imageCoordinates.x >= pokemonCoordinates.minimumX &&
      imageCoordinates.x <= pokemonCoordinates.maximumX &&
      imageCoordinates.y >= pokemonCoordinates.minimumY &&
      imageCoordinates.y <= pokemonCoordinates.maximumY
    ) {
      setIsCorrectAnswer(true);
      setGameProgress({ ...gameProgress, [pickedPokemon]: true });
    } else {
      setIsCorrectAnswer(false);
    }
    const imageXCoordinate = e.pageX - e.target.offsetLeft;
    const imageYCoordinate = e.pageY - e.target.offsetTop;
    const clickXCoordinate = e.pageX;
    const clickYCoordinate = e.pageY;
    setAnswerImageCoordinates({
      x: imageXCoordinate,
      y: imageYCoordinate,
    });
    setAnswerClickCoordinates({
      x: clickXCoordinate,
      y: clickYCoordinate,
    });
    setDisplayMenu(!displayMenu);
    resetClickState();
    clearTimeout(answerReactionTimerIdRef.current);
    const timerId = setTimeout(() => {
      setIsCorrectAnswer(null);
      answerReactionTimerIdRef.current = null;
    }, 2500);
    answerReactionTimerIdRef.current = timerId;
  };

  return (
    <div data-testid="game">
      <NavBar
        gameData={gameData}
        gameProgress={gameProgress}
        elapsedTime={formatTime(currentTime - startTime)}
      />
      <main className="game-area">
        <img
          onClick={(e) => {
            if (!checkIfAllPokemonFound()) {
              handleImageClick(e);
            }
          }}
          src={require(`../assets/images/game_versions/${gameVersion}.png`)}
          alt={
            gameVersion === "version2"
              ? "A compilation of all Pokemon released up to Generation 5."
              : "A compilation of all Pokemon released up to Generation 4."
          }
        />
      </main>
      {displayMenu && (
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
            handlePickedOption={handlePickedOption}
          />
        </>
      )}
      {isCorrectAnswer !== null && (
        <AnswerReaction
          isCorrect={isCorrectAnswer}
          imagePosition={answerImageCoordinates}
          clickPosition={answerClickCoordinates}
          gameData={gameData}
        />
      )}
      {displayModal && (
        <SubmitScoreModal
          timeScore={currentTime - startTime}
          displayTime={formatTime(currentTime - startTime)}
          submitScore={submitScore}
          closeModal={() => setDisplayModal(false)}
        />
      )}
    </div>
  );
};

export default Game;
