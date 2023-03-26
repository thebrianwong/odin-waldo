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
      validationData={validationData.version1}
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
      validationData={validationData.version1}
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

test("The target area and dropdown menu disappear when choosing an option", () => {
  render(
    <Game
      gameData={gameData.version1}
      gameVersion="version1"
      validationData={validationData.version1}
      formatTime={mockFunction}
      submitScore={mockFunction}
    />,
    { wrapper: BrowserRouter }
  );
  const image = screen.getByAltText(
    "A compilation of all Pokemon released up to Generation 4."
  );
  act(() => {
    userEvent.click(image, { clientX: 400, clientY: 400 });
  });
  act(() => {
    userEvent.click(image, { clientX: 400, clientY: 300 });
  });
  const targetArea = screen.queryByTestId("target-area");
  const dropdownElement = screen.queryByTestId("dropdown-menu");
  expect(targetArea).toBeNull();
  expect(dropdownElement).toBeNull();
});

test("The dropdown menu options can be picked, causing the target area and dropdown menu to disappear", () => {
  render(
    <Game
      gameData={gameData.version1}
      gameVersion="version1"
      validationData={validationData.version1}
      formatTime={mockFunction}
      submitScore={mockFunction}
    />,
    { wrapper: BrowserRouter }
  );
  const image = screen.getByAltText(
    "A compilation of all Pokemon released up to Generation 4."
  );
  act(() => {
    userEvent.click(image, { clientX: 400, clientY: 400 });
  });
  const dropdownElement = screen.getByTestId("dropdown-menu");
  const pokemonOptions = within(dropdownElement).getAllByRole("listitem");
  expect(pokemonOptions.length).toBe(3);
  const mudkipName = within(pokemonOptions[0]).getByText("Mudkip");
  expect(mudkipName).toBeInTheDocument();
  act(() => {
    userEvent.click(pokemonOptions[0]);
  });
  const targetArea = screen.queryByTestId("target-area");
  const unrenderedDropdownElement = screen.queryByTestId("dropdown-menu");
  expect(targetArea).toBeNull();
  expect(unrenderedDropdownElement).toBeNull();
  expect(mudkipName).not.toBeInTheDocument();
});

test("The answer reaction appears when a dropdown menu option is picked", () => {
  render(
    <Game
      gameData={gameData.version1}
      gameVersion="version1"
      validationData={validationData.version1}
      formatTime={mockFunction}
      submitScore={mockFunction}
    />,
    { wrapper: BrowserRouter }
  );
  const image = screen.getByAltText(
    "A compilation of all Pokemon released up to Generation 4."
  );
  act(() => {
    userEvent.click(image, { clientX: 800, clientY: 800 });
  });
  const dropdownElement = screen.getByTestId("dropdown-menu");
  const pokemonOptions = within(dropdownElement).getAllByRole("listitem");
  act(() => {
    userEvent.click(pokemonOptions[0]);
  });
  const answerReaction = screen.getByTestId("answer-reaction");
  expect(answerReaction).toBeInTheDocument();
});
