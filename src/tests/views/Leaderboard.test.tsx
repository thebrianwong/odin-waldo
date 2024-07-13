import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Leaderboard from "../../views/Leaderboard";
import "@testing-library/jest-dom";
import { AppRouterContextProviderMock } from "../utils";

const leaderboardData = {
  version1: [
    {
      name: "A",
      score: 3000,
      favoritePokemon: "a",
      timeStamp: "March 17, 2023 at 3:58:13 PM UTC-7",
    },
    {
      name: "B",
      score: 2000,
      favoritePokemon: "b",
      timeStamp: "March 18, 2023 at 3:58:13 PM UTC-7",
    },
    {
      name: "C",
      score: 1000,
      favoritePokemon: "c",
      timeStamp: "March 19, 2023 at 3:58:13 PM UTC-7",
    },
  ],
  version2: [
    {
      name: "D",
      score: 3000,
      favoritePokemon: "d",
      timeStamp: "March 20, 2023 at 3:58:13 PM UTC-7",
    },
    {
      name: "E",
      score: 2000,
      favoritePokemon: "e",
      timeStamp: "March 21, 2023 at 3:58:13 PM UTC-7",
    },
    {
      name: "F",
      score: 1000,
      favoritePokemon: "f",
      timeStamp: "March 22, 2023 at 3:58:13 PM UTC-7",
    },
  ],
  version3: [
    {
      name: "G",
      score: 3000,
      favoritePokemon: "g",
      timeStamp: "March 23, 2023 at 3:58:13 PM UTC-7",
    },
    {
      name: "H",
      score: 2000,
      favoritePokemon: "h",
      timeStamp: "March 24, 2023 at 3:58:13 PM UTC-7",
    },
    {
      name: "I",
      score: 1000,
      favoritePokemon: "i",
      timeStamp: "March 25, 2023 at 3:58:13 PM UTC-7",
    },
  ],
};
const mockFunction = jest.fn();
global.scrollTo = jest.fn();

beforeEach(() => {
  mockFunction.mockImplementation((input) => input);
});

test("The page gets rendered", () => {
  render(
    <AppRouterContextProviderMock
      router={{ push: jest.fn() }}
      params={{ gameVersion: "normal" }}
    >
      <Leaderboard leaderboardData={leaderboardData} difficulty="normal" />
    </AppRouterContextProviderMock>
  );
  const leaderboardPage = screen.getByTestId("leaderboard");
  expect(leaderboardPage).toBeInTheDocument();
});

test("The Pokemon logo is displayed", () => {
  render(
    <AppRouterContextProviderMock
      router={{ push: jest.fn() }}
      params={{ gameVersion: "normal" }}
    >
      <Leaderboard leaderboardData={leaderboardData} difficulty="normal" />
    </AppRouterContextProviderMock>
  );
  const pokemonLogo = screen.getByAltText(
    "The original Pokemon logo with a styled font, dark blue outline, and yellow fill."
  );
  expect(pokemonLogo).toBeInTheDocument();
});

describe("Testing difficulty label function", () => {
  test("Normal", () => {
    render(
      <AppRouterContextProviderMock
        router={{ push: jest.fn() }}
        params={{ gameVersion: "normal" }}
      >
        <Leaderboard leaderboardData={leaderboardData} difficulty="normal" />
      </AppRouterContextProviderMock>
    );
    const normalLabel = screen.getByRole("heading");
    expect(normalLabel).toHaveTextContent("Normal");
  });
  test("Hard", () => {
    render(
      <AppRouterContextProviderMock
        router={{ push: jest.fn() }}
        params={{ gameVersion: "hard" }}
      >
        <Leaderboard leaderboardData={leaderboardData} difficulty="hard" />
      </AppRouterContextProviderMock>
    );
    const hardLabel = screen.getByRole("heading");
    expect(hardLabel).toHaveTextContent("Hard");
  });
  test("Weird", () => {
    render(
      <AppRouterContextProviderMock
        router={{ push: jest.fn() }}
        params={{ gameVersion: "weird" }}
      >
        <Leaderboard leaderboardData={leaderboardData} difficulty="weird" />
      </AppRouterContextProviderMock>
    );
    const weirdLabel = screen.getByRole("heading");
    expect(weirdLabel).toHaveTextContent("Weird");
  });
});

test("The select menu defaults to the initialGameVersion prop value", () => {
  render(
    <AppRouterContextProviderMock
      router={{ push: jest.fn() }}
      params={{ gameVersion: "hard" }}
    >
      <Leaderboard leaderboardData={leaderboardData} difficulty="hard" />
    </AppRouterContextProviderMock>
  );
  const selectMenu: HTMLSelectElement = screen.getByTestId("select-menu");
  const selectOption = screen.getByRole("option", { name: "Hard" });
  expect(selectMenu.value).toBe("hard");
  expect(selectOption).toBeInTheDocument();
});

test("The difficulty can be changed by choosing a different option in the select menu", () => {
  const mockPush = jest.fn();
  render(
    <AppRouterContextProviderMock
      router={{ push: mockPush }}
      params={{ gameVersion: "normal" }}
    >
      <Leaderboard leaderboardData={leaderboardData} difficulty="normal" />
    </AppRouterContextProviderMock>
  );
  const selectMenu = screen.getByTestId("select-menu");
  const difficultyLabel = screen.getByRole("heading");
  expect(difficultyLabel).toHaveTextContent("Normal");
  userEvent.selectOptions(selectMenu, ["weird"]);
  expect(mockPush).toHaveBeenCalled();
});

test("The table is rendered with 5 columns", () => {
  render(
    <AppRouterContextProviderMock
      router={{ push: jest.fn() }}
      params={{ gameVersion: "normal" }}
    >
      <Leaderboard leaderboardData={leaderboardData} difficulty="normal" />
    </AppRouterContextProviderMock>
  );
  const table = screen.getByRole("table");
  const columns = screen.getAllByRole("columnheader");
  expect(table).toBeInTheDocument();
  expect(columns.length).toBe(5);
  expect(columns[0]).toHaveTextContent("Rank");
  expect(columns[1]).toHaveTextContent("Trainer Name");
  expect(columns[2]).toHaveTextContent("Time");
  expect(columns[3]).toHaveTextContent("Favorite Pokemon");
  expect(columns[4]).toHaveTextContent("Date");
});
