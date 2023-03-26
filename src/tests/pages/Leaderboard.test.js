import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import Leaderboard from "../../pages/Leaderboard";

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

beforeEach(() => {
  mockFunction.mockImplementation((input) => input);
});

test("The page gets rendered", () => {
  render(
    <Leaderboard
      leaderboardData={leaderboardData}
      initialGameVersion="version1"
      formatTime={mockFunction}
    />,
    { wrapper: BrowserRouter }
  );
  const leaderboardPage = screen.getByTestId("leaderboard");
  expect(leaderboardPage).toBeInTheDocument();
});

test("The Pokemon logo is displayed", () => {
  render(
    <Leaderboard
      leaderboardData={leaderboardData}
      initialGameVersion="version1"
      formatTime={mockFunction}
    />,
    { wrapper: BrowserRouter }
  );
  const pokemonLogo = screen.getByAltText(
    "The original Pokemon logo with a styled font, dark blue outline, and yellow fill."
  );
  expect(pokemonLogo).toBeInTheDocument();
});

describe("Testing difficulty label function", () => {
  test("Normal", () => {
    render(
      <Leaderboard
        leaderboardData={leaderboardData}
        initialGameVersion="version1"
        formatTime={mockFunction}
      />,
      { wrapper: BrowserRouter }
    );
    const normalLabel = screen.getByRole("heading");
    expect(normalLabel).toHaveTextContent("Normal");
  });
  test("Hard", () => {
    render(
      <Leaderboard
        leaderboardData={leaderboardData}
        initialGameVersion="version2"
        formatTime={mockFunction}
      />,
      { wrapper: BrowserRouter }
    );
    const hardLabel = screen.getByRole("heading");
    expect(hardLabel).toHaveTextContent("Hard");
  });
  test("Weird", () => {
    render(
      <Leaderboard
        leaderboardData={leaderboardData}
        initialGameVersion="version3"
        formatTime={mockFunction}
      />,
      { wrapper: BrowserRouter }
    );
    const weirdLabel = screen.getByRole("heading");
    expect(weirdLabel).toHaveTextContent("Weird");
  });
});

test("The select menu defaults to the initialGameVersion prop value", () => {
  render(
    <Leaderboard
      leaderboardData={leaderboardData}
      initialGameVersion="version2"
      formatTime={mockFunction}
    />,
    { wrapper: BrowserRouter }
  );
  const selectMenu = screen.getByTestId("select-menu");
  const selectOption = screen.getByRole("option", { name: "Hard" });
  expect(selectMenu.value).toBe("version2");
  expect(selectOption).toBeInTheDocument();
});

test("The difficulty can be changed by choosing a different option in the select menu", () => {
  render(
    <Leaderboard
      leaderboardData={leaderboardData}
      initialGameVersion="version1"
      formatTime={mockFunction}
    />,
    { wrapper: BrowserRouter }
  );
  const selectMenu = screen.getByTestId("select-menu");
  const difficultyLabel = screen.getByRole("heading");
  expect(difficultyLabel).toHaveTextContent("Normal");
  act(() => {
    userEvent.selectOptions(selectMenu, ["version3"]);
  });
  expect(difficultyLabel).toHaveTextContent("Weird");
});

test("The table is rendered with 5 columns", () => {
  render(
    <Leaderboard
      leaderboardData={leaderboardData}
      initialGameVersion="version1"
      formatTime={mockFunction}
    />,
    { wrapper: BrowserRouter }
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

test("The table is populated with corresponding difficulty entries sorted from lowest to highest time", () => {
  render(
    <Leaderboard
      leaderboardData={leaderboardData}
      initialGameVersion="version1"
      formatTime={mockFunction}
    />,
    { wrapper: BrowserRouter }
  );
  const tableBody = screen.queryByTestId("table-body");
  const scoreEntries = within(tableBody).getAllByRole("row");
  const firstRowCells = within(scoreEntries[0]).getAllByRole("cell");
  const secondRowCells = within(scoreEntries[1]).getAllByRole("cell");
  const thirdRowCells = within(scoreEntries[2]).getAllByRole("cell");

  expect(firstRowCells[0]).toHaveTextContent("#1");
  expect(firstRowCells[1]).toHaveTextContent("C");
  expect(firstRowCells[2]).toHaveTextContent("1000");
  expect(firstRowCells[3]).toHaveTextContent("c");
  expect(firstRowCells[4]).toHaveTextContent(
    "March 19, 2023 at 3:58:13 PM UTC-7"
  );

  expect(secondRowCells[0]).toHaveTextContent("#2");
  expect(secondRowCells[1]).toHaveTextContent("B");
  expect(secondRowCells[2]).toHaveTextContent("2000");
  expect(secondRowCells[3]).toHaveTextContent("b");
  expect(secondRowCells[4]).toHaveTextContent(
    "March 18, 2023 at 3:58:13 PM UTC-7"
  );

  expect(thirdRowCells[0]).toHaveTextContent("#3");
  expect(thirdRowCells[1]).toHaveTextContent("A");
  expect(thirdRowCells[2]).toHaveTextContent("3000");
  expect(thirdRowCells[3]).toHaveTextContent("a");
  expect(thirdRowCells[4]).toHaveTextContent(
    "March 17, 2023 at 3:58:13 PM UTC-7"
  );

  expect(scoreEntries.length).toBe(3);
  expect(firstRowCells.length).toBe(5);
  expect(secondRowCells.length).toBe(5);
  expect(thirdRowCells.length).toBe(5);
});

test("The table entries change when a new difficulty is chosen", () => {
  render(
    <Leaderboard
      leaderboardData={leaderboardData}
      initialGameVersion="version2"
      formatTime={mockFunction}
    />,
    { wrapper: BrowserRouter }
  );
  const tableBody = screen.queryByTestId("table-body");
  const scoreEntries = within(tableBody).getAllByRole("row");
  const firstRowCells = within(scoreEntries[0]).getAllByRole("cell");
  const secondRowCells = within(scoreEntries[1]).getAllByRole("cell");
  const thirdRowCells = within(scoreEntries[2]).getAllByRole("cell");

  expect(firstRowCells[0]).toHaveTextContent("#1");
  expect(firstRowCells[1]).toHaveTextContent("F");
  expect(firstRowCells[2]).toHaveTextContent("1000");
  expect(firstRowCells[3]).toHaveTextContent("f");
  expect(firstRowCells[4]).toHaveTextContent(
    "March 22, 2023 at 3:58:13 PM UTC-7"
  );

  expect(secondRowCells[0]).toHaveTextContent("#2");
  expect(secondRowCells[1]).toHaveTextContent("E");
  expect(secondRowCells[2]).toHaveTextContent("2000");
  expect(secondRowCells[3]).toHaveTextContent("e");
  expect(secondRowCells[4]).toHaveTextContent(
    "March 21, 2023 at 3:58:13 PM UTC-7"
  );

  expect(thirdRowCells[0]).toHaveTextContent("#3");
  expect(thirdRowCells[1]).toHaveTextContent("D");
  expect(thirdRowCells[2]).toHaveTextContent("3000");
  expect(thirdRowCells[3]).toHaveTextContent("d");
  expect(thirdRowCells[4]).toHaveTextContent(
    "March 20, 2023 at 3:58:13 PM UTC-7"
  );

  const selectMenu = screen.getByTestId("select-menu");
  act(() => {
    userEvent.selectOptions(selectMenu, ["version3"]);
  });

  expect(firstRowCells[0]).toHaveTextContent("#1");
  expect(firstRowCells[1]).toHaveTextContent("I");
  expect(firstRowCells[2]).toHaveTextContent("1000");
  expect(firstRowCells[3]).toHaveTextContent("i");
  expect(firstRowCells[4]).toHaveTextContent(
    "March 25, 2023 at 3:58:13 PM UTC-7"
  );

  expect(secondRowCells[0]).toHaveTextContent("#2");
  expect(secondRowCells[1]).toHaveTextContent("H");
  expect(secondRowCells[2]).toHaveTextContent("2000");
  expect(secondRowCells[3]).toHaveTextContent("h");
  expect(secondRowCells[4]).toHaveTextContent(
    "March 24, 2023 at 3:58:13 PM UTC-7"
  );

  expect(thirdRowCells[0]).toHaveTextContent("#3");
  expect(thirdRowCells[1]).toHaveTextContent("G");
  expect(thirdRowCells[2]).toHaveTextContent("3000");
  expect(thirdRowCells[3]).toHaveTextContent("g");
  expect(thirdRowCells[4]).toHaveTextContent(
    "March 23, 2023 at 3:58:13 PM UTC-7"
  );
});
