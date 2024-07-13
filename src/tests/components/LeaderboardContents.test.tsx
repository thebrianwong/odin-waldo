import { render, screen, within } from "@testing-library/react";
import LeaderboardContents from "../../components/LeaderboardContents";
import "@testing-library/jest-dom";

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
  ],
  version2: [
    {
      name: "C",
      score: 3000,
      favoritePokemon: "c",
      timeStamp: "March 20, 2023 at 3:58:13 PM UTC-7",
    },
    {
      name: "D",
      score: 2000,
      favoritePokemon: "d",
      timeStamp: "March 21, 2023 at 3:58:13 PM UTC-7",
    },
  ],
  version3: [
    {
      name: "E",
      score: 3000,
      favoritePokemon: "e",
      timeStamp: "March 23, 2023 at 3:58:13 PM UTC-7",
    },
    {
      name: "F",
      score: 2000,
      favoritePokemon: "f",
      timeStamp: "March 24, 2023 at 3:58:13 PM UTC-7",
    },
  ],
};

test("The component renders correctly", () => {
  render(<LeaderboardContents data={leaderboardData} difficulty="normal" />);
  const tableBody = screen.getByTestId("table-body");
  expect(tableBody).toBeInTheDocument();
});

test("Each row has 5 cells", () => {
  render(<LeaderboardContents data={leaderboardData} difficulty="normal" />);
  const row = screen.getAllByRole("row")[0];
  const cells = within(row).getAllByRole("cell");
  expect(cells).toHaveLength(5);
});

test("The rank is in ascending order starting from 1", () => {
  render(<LeaderboardContents data={leaderboardData} difficulty="normal" />);
  const rows = screen.getAllByRole("row");
  const rowOne = rows[0];
  const rowTwo = rows[1];
  const rankOne = within(rowOne).getByText("#1");
  const rankTwo = within(rowTwo).getByText("#2");
  expect(rankOne).toBeInTheDocument();
  expect(rankTwo).toBeInTheDocument();
});

test("The unformatted name, favorite Pokemon, and date get displayed", () => {
  render(<LeaderboardContents data={leaderboardData} difficulty="normal" />);
  const name = screen.getByText("A");
  const pokemon = screen.getByText("a");
  const date = screen.getByText("March 17, 2023 at 3:58:13 PM UTC-7");
  expect(name).toBeInTheDocument();
  expect(pokemon).toBeInTheDocument();
  expect(date).toBeInTheDocument();
});

test("The time gets properly formatted", () => {
  render(<LeaderboardContents data={leaderboardData} difficulty="normal" />);
  const timeA = screen.getByText("00:03");
  expect(timeA).toBeInTheDocument();
});

describe("The displayed data is based on the difficulty prop", () => {
  test("Normal", () => {
    render(<LeaderboardContents data={leaderboardData} difficulty="normal" />);
    const rowOneName = screen.getByText("A");
    const rowTwoName = screen.getByText("B");
    expect(rowOneName).toBeInTheDocument();
    expect(rowTwoName).toBeInTheDocument();
  });

  test("Hard", () => {
    render(<LeaderboardContents data={leaderboardData} difficulty="hard" />);
    const rowOneName = screen.getByText("C");
    const rowTwoName = screen.getByText("D");
    expect(rowOneName).toBeInTheDocument();
    expect(rowTwoName).toBeInTheDocument();
  });

  test("Weird", () => {
    render(<LeaderboardContents data={leaderboardData} difficulty="weird" />);
    const rowOneName = screen.getByText("E");
    const rowTwoName = screen.getByText("F");
    expect(rowOneName).toBeInTheDocument();
    expect(rowTwoName).toBeInTheDocument();
  });
});
