"use client";

import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import DropdownMenu from "../components/DropdownMenu";
import NavBar from "../components/NavBar";
import TargetArea from "../components/TargetArea";
import AnswerReaction from "../components/AnswerReaction";
import SubmitScoreModal from "../components/SubmitScoreModal";
import GameProgress from "../types/gameProgress.type";
import ImageBorder from "../types/imageBorder.type";
import Position from "../types/position.type";
import { gameVersionImages } from "../app/assets";
import gameData from "../gameData.json";
import { formatTime } from "../utils";
import GameVersion from "../types/gameVersion.type";
import SubmissionResponse from "../types/submissionResponse.type";
import { TotalValidationData } from "../types/validationData.type";

interface GameProps {
  gameVersion: GameVersion;
  validationData: TotalValidationData;
}

const Game = ({ validationData, gameVersion }: GameProps) => {
  const elapsedTimeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const answerReactionTimerIdRef = useRef<NodeJS.Timeout | null>(null);
  const [gameProgress, setGameProgress] = useState<GameProgress>({
    [gameData[gameVersion].pokemonNames[0]]: false,
    [gameData[gameVersion].pokemonNames[1]]: false,
    [gameData[gameVersion].pokemonNames[2]]: false,
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
    const pokemonCoordinates = validationData[gameVersion][pickedPokemon];
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

  const checkForEmptyName = (name: string) => {
    if (name === "") {
      return "Anonymous Trainer";
    }
    return name;
  };

  const checkForEmptyFavoritePokemon = (favoritePokemon: string) => {
    if (favoritePokemon === "") {
      return "Missingno";
    }
    return favoritePokemon;
  };

  const submitScore = async (
    timeInMilliseconds: number,
    playerName: string,
    playerFavoritePokemon: string,
    gameVersion: GameVersion
  ): Promise<SubmissionResponse> => {
    try {
      const data = {
        name: checkForEmptyName(playerName),
        score: timeInMilliseconds,
        favoritePokemon: checkForEmptyFavoritePokemon(playerFavoritePokemon),
        gameVersion,
      };
      const submissionResponse = (await fetch(
        `${process.env.NEXT_PUBLIC_API_GATEWAY_HTTPS_ENDPOINT}/leaderboard`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY!,
          },
          body: JSON.stringify(data),
        }
      ).then((data) => data.json())) as SubmissionResponse;
      return submissionResponse;
    } catch (e) {
      console.error("There was an error submitting your score. Try again!");
      return {
        success: false,
        message: ["There is an error with the server. Please try again!"],
      };
    }
  };

  return (
    <div className={`game-page game-page-${gameVersion}`} data-testid="game">
      <NavBar
        gameData={gameData[gameVersion]}
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
          src={gameVersionImages[gameVersion]}
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
            gameData={gameData[gameVersion]}
          />
          <DropdownMenu
            imagePosition={imageCoordinates}
            clickPosition={clickCoordinates}
            clientPosition={clientCoordinates}
            imageBorder={imageBorder}
            gameData={gameData[gameVersion]}
            handlePickedOption={handlePickedOption}
          />
        </>
      )}
      {isCorrectAnswer !== null && (
        <AnswerReaction
          isCorrect={isCorrectAnswer}
          imagePosition={answerImageCoordinates}
          clickPosition={answerClickCoordinates}
          gameData={gameData[gameVersion]}
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
