import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { gameData } from "../../gameData";
import Game from "../../pages/Game";

const validationData = {
  version1: {
    Mudkip: {
      minimumX: 0,
      maximumX: 1000,
      minimumY: 0,
      maximumY: 1000,
    },
    Gloom: {
      minimumX: 0,
      maximumX: 1000,
      minimumY: 0,
      maximumY: 1000,
    },
    Politoed: {
      minimumX: 0,
      maximumX: 1000,
      minimumY: 0,
      maximumY: 1000,
    },
  },
  version2: {
    Pichu: {
      minimumX: 0,
      maximumX: 1000,
      minimumY: 0,
      maximumY: 1000,
    },
    Graveler: {
      minimumX: 0,
      maximumX: 1000,
      minimumY: 0,
      maximumY: 1000,
    },
    Slaking: {
      minimumX: 0,
      maximumX: 1000,
      minimumY: 0,
      maximumY: 1000,
    },
  },
  version3: {
    Pikachu: {
      minimumX: 0,
      maximumX: 1000,
      minimumY: 0,
      maximumY: 1000,
    },
    Charizard: {
      minimumX: 0,
      maximumX: 1000,
      minimumY: 0,
      maximumY: 1000,
    },
    Snorlax: {
      minimumX: 0,
      maximumX: 1000,
      minimumY: 0,
      maximumY: 1000,
    },
  },
};
const mockFunction = jest.fn();
global.visualViewport = { width: 900, height: 900 };

test("The page renders", () => {
  render(
    <Game
      gameData={gameData.version1}
      gameVersion="version1"
      validationData={validationData}
      formatTime={mockFunction}
      submitScore={mockFunction}
    />,
    { wrapper: BrowserRouter }
  );
  const game = screen.getByTestId("game");
  const image = screen.getByAltText(
    "A compilation of all Pokemon released up to Generation 4."
  );
  expect(game).toBeInTheDocument();
  expect(image).toBeInTheDocument();
});

test("The image can be clicked to display the target area and dropdown menu", () => {
  render(
    <Game
      gameData={gameData.version1}
      gameVersion="version1"
      validationData={validationData}
      formatTime={mockFunction}
      submitScore={mockFunction}
    />,
    { wrapper: BrowserRouter }
  );
  const image = screen.getByAltText(
    "A compilation of all Pokemon released up to Generation 4."
  );
  act(() => {
    userEvent.click(image);
  });
  const targetArea = screen.getByTestId("target-area");
  const dropdownElement = screen.getByTestId("dropdown-menu");
  expect(targetArea).toBeInTheDocument();
  expect(dropdownElement).toBeInTheDocument();
});
