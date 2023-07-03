import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import NavBar from "../../components/NavBar/NavBar";
import TargetArea from "../../components/TargetArea/TargetArea";
import AnswerReaction from "../../components/AnswerReaction/AnswerReaction";
import SubmitScoreModal from "../../components/SubmitScoreModal/SubmitScoreModal";
import GameProps from "./type";
import GameProgress from "../../types/gameProgress.type";
import ImageBorder from "../../types/imageBorder.type";
import Position from "../../types/position.type";

const Game = ({
  gameData,
  gameVersion,
  validationData,
  formatTime,
  submitScore,
}: GameProps) => {
  const elapsedTimeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const answerReactionTimerIdRef = useRef<NodeJS.Timeout | null>(null);

  const [gameProgress, setGameProgress] = useState<GameProgress>({
    [gameData.pokemonNames[0]]: false,
    [gameData.pokemonNames[1]]: false,
    [gameData.pokemonNames[2]]: false,
  });

  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number | null>(null);

  // how far down or left from the page is each border of the image
  const [imageBorder, setImageBorder] = useState<ImageBorder>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });
  // coordinates of the click relative to image, starts at top left corner of image
  const [imageCoordinates, setImageCoordinates] = useState<Position>({
    x: 0,
    y: 0,
  });
  // coordinates of the click relative to the entire page, starts at the top left corner of the page
  const [clickCoordinates, setClickCoordinates] = useState<Position>({
    x: 0,
    y: 0,
  });
  // coordinates of the click relative to the viewport, starts at the top left corner of what is being displayed
  const [clientCoordinates, setClientCoordinates] = useState<Position>({
    x: 0,
    y: 0,
  });

  const [answerImageCoordinates, setAnswerImageCoordinates] =
    useState<Position>({
      x: 0,
      y: 0,
    });
  const [answerClickCoordinates, setAnswerClickCoordinates] =
    useState<Position>({
      x: 0,
      y: 0,
    });

  const [displayMenu, setDisplayMenu] = useState<boolean>(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [displayModal, setDisplayModal] = useState<boolean>(false);

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
      clearInterval(elapsedTimeIntervalRef.current!);
      setDisplayModal(true);
    }
  }, [gameProgress, checkIfAllPokemonFound]);

  useEffect(() => {
    if (isCorrectAnswer === null) {
      setAnswerImageCoordinates({
        x: 0,
        y: 0,
      });
      setAnswerClickCoordinates({
        x: 0,
        y: 0,
      });
    }
  }, [isCorrectAnswer]);

  const resetClickState = () => {
    setImageCoordinates({ x: 0, y: 0 });
    setClickCoordinates({ x: 0, y: 0 });
    setClientCoordinates({
      x: 0,
      y: 0,
    });
    setImageBorder({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    });
  };

  const handleImageClick = (e: MouseEvent) => {
    setDisplayMenu(!displayMenu);
    if (displayMenu) {
      resetClickState();
      return;
    }
    const imageElement = e.target as HTMLImageElement;
    const imageXCoordinate = e.pageX - imageElement.offsetLeft;
    const imageYCoordinate = e.pageY - imageElement.offsetTop;
    const clickXCoordinate = e.pageX;
    const clickYCoordinate = e.pageY;
    const clientXCoordinate = e.clientX;
    const clientYCoordinate = e.clientY;
    const imageBorderTop = imageElement.offsetTop;
    const imageBorderRight = imageElement.offsetLeft + imageElement.offsetWidth;
    const imageBorderBottom =
      imageElement.offsetTop + imageElement.offsetHeight;
    const imageBorderLeft = imageElement.offsetLeft;
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

  const handlePickedOption = (e: MouseEvent, pickedPokemon: string) => {
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
    const pickedOptionElement = e.target as HTMLLIElement;
    const imageXCoordinate = e.pageX - pickedOptionElement.offsetLeft;
    const imageYCoordinate = e.pageY - pickedOptionElement.offsetTop;
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
    clearTimeout(answerReactionTimerIdRef.current!);
    const timerId = setTimeout(() => {
      setIsCorrectAnswer(null);
      answerReactionTimerIdRef.current = null;
    }, 2500);
    answerReactionTimerIdRef.current = timerId;
  };

  return (
    <div className={`game-page game-page-${gameVersion}`} data-testid="game">
      <NavBar
        gameData={gameData}
        gameProgress={gameProgress}
        elapsedTime={formatTime(currentTime! - startTime!)}
      />
      <main className="game-area">
        <img
          className="game-image"
          onClick={(e: MouseEvent) => {
            if (!checkIfAllPokemonFound()) {
              handleImageClick(e);
            }
          }}
          src={require(`../../assets/images/game_versions/${gameVersion}.png`)}
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
          timeScore={currentTime! - startTime!}
          displayTime={formatTime(currentTime! - startTime!)}
          gameVersion={gameVersion}
          submitScore={submitScore}
          closeModal={() => setDisplayModal(false)}
        />
      )}
    </div>
  );
};

export default Game;
