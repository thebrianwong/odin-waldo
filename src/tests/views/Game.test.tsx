import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from "../../views/Game";
import "@testing-library/jest-dom";

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
global.scrollTo = jest.fn();
const defaultVisualViewport = {
  width: 900,
  height: 900,
  offsetLeft: 0,
  offsetTop: 0,
  pageLeft: 0,
  pageTop: 0,
  onresize: jest.fn(),
  onscroll: jest.fn(),
  scale: 1,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
};
global.visualViewport = defaultVisualViewport;

test("The page renders", () => {
  render(<Game gameVersion="version1" validationData={validationData} />);
  const game = screen.getByTestId("game");
  const image = screen.getByAltText(
    "A compilation of all Pokemon released up to Generation 4."
  );
  expect(game).toBeInTheDocument();
  expect(image).toBeInTheDocument();
});

test("The image can be clicked to display the target area and dropdown menu", () => {
  render(<Game gameVersion="version1" validationData={validationData} />);
  const image = screen.getByAltText(
    "A compilation of all Pokemon released up to Generation 4."
  );
  userEvent.click(image);
  const targetArea = screen.getByTestId("target-area");
  const dropdownElement = screen.getByTestId("dropdown-menu");
  expect(targetArea).toBeInTheDocument();
  expect(dropdownElement).toBeInTheDocument();
});

test("The target area and dropdown menu disappear when choosing an option", () => {
  render(<Game gameVersion="version1" validationData={validationData} />);
  const image = screen.getByAltText(
    "A compilation of all Pokemon released up to Generation 4."
  );
  userEvent.click(image, { clientX: 400, clientY: 400 });
  userEvent.click(image, { clientX: 400, clientY: 300 });
  const targetArea = screen.queryByTestId("target-area");
  const dropdownElement = screen.queryByTestId("dropdown-menu");
  expect(targetArea).toBeNull();
  expect(dropdownElement).toBeNull();
});

test("The dropdown menu options can be picked, causing the target area and dropdown menu to disappear", () => {
  render(<Game gameVersion="version1" validationData={validationData} />);
  const image = screen.getByAltText(
    "A compilation of all Pokemon released up to Generation 4."
  );
  userEvent.click(image, { clientX: 400, clientY: 400 });
  const dropdownElement = screen.getByTestId("dropdown-menu");
  const pokemonOptions = within(dropdownElement).getAllByRole("listitem");
  expect(pokemonOptions.length).toBe(3);
  const mudkipName = within(pokemonOptions[0]).getByText("Mudkip");
  expect(mudkipName).toBeInTheDocument();
  userEvent.click(pokemonOptions[0]);
  const targetArea = screen.queryByTestId("target-area");
  const unrenderedDropdownElement = screen.queryByTestId("dropdown-menu");
  expect(targetArea).toBeNull();
  expect(unrenderedDropdownElement).toBeNull();
  expect(mudkipName).not.toBeInTheDocument();
});

test("The answer reaction appears when a dropdown menu option is picked", () => {
  render(<Game gameVersion="version1" validationData={validationData} />);
  const image = screen.getByAltText(
    "A compilation of all Pokemon released up to Generation 4."
  );
  userEvent.click(image, { clientX: 800, clientY: 800 });
  const dropdownElement = screen.getByTestId("dropdown-menu");
  const pokemonOptions = within(dropdownElement).getAllByRole("listitem");
  userEvent.click(pokemonOptions[0]);
  const answerReaction = screen.getByTestId("answer-reaction");
  expect(answerReaction).toBeInTheDocument();
});
