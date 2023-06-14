import { render, screen, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { gameData } from "../../gameData";
import Homepage from "../../pages/Homepage/Homepage";

const mockFunction = jest.fn();

test("The page renders", () => {
  render(<Homepage gameData={gameData} chooseGameVersion={mockFunction} />, {
    wrapper: BrowserRouter,
  });
  const homepage = screen.getByTestId("homepage");
  expect(homepage).toBeInTheDocument();
});

test("The header contains all expected elements", () => {
  render(<Homepage gameData={gameData} chooseGameVersion={mockFunction} />, {
    wrapper: BrowserRouter,
  });
  const leaderboardButton = screen.getByRole("button", { name: "Leaderboard" });
  const pokemonLogo = screen.getByAltText(
    "The original Pokemon logo with a styled font, dark blue outline, and yellow fill."
  );
  const fakeSlogan = screen.getByText("Gotta find 'em all!");
  expect(leaderboardButton).toBeInTheDocument();
  expect(pokemonLogo).toBeInTheDocument();
  expect(fakeSlogan).toBeInTheDocument();
});

test("The footer contains all expected elements", () => {
  render(<Homepage gameData={gameData} chooseGameVersion={mockFunction} />, {
    wrapper: BrowserRouter,
  });
  const credits = screen.getByText(
    "All assets belong to Nintendo and Game Freak. Weird level image by . Favicon by ."
  );
  const link1 = screen.getByRole("link", {
    name: "Burn The Internet",
    link: "http://www.burntheinternet.com/p/the-impostor-minineko-pokedex.html",
  });
  const link2 = screen.getByRole("link", {
    name: "Davi Andrade",
    link: "https://www.deviantart.com/davi-1",
  });
  expect(credits).toBeInTheDocument();
  expect(link1).toBeInTheDocument();
});

test("There are 3 buttons for each game version", () => {
  render(<Homepage gameData={gameData} chooseGameVersion={mockFunction} />, {
    wrapper: BrowserRouter,
  });
  const main = screen.getByRole("main");
  const gameVersionButtons = within(main).getAllByRole("button");
  expect(gameVersionButtons.length).toBe(3);
});

describe("Each game version buttons has the correct corresponding elements", () => {
  test("Version1", () => {
    render(<Homepage gameData={gameData} chooseGameVersion={mockFunction} />, {
      wrapper: BrowserRouter,
    });
    const main = screen.getByRole("main");
    const gameVersionButtons = within(main).getAllByRole("button");

    const version1Button = gameVersionButtons[0];
    const version1Image = within(version1Button).getByAltText(
      "A preview thumbnail of the Normal version of the game."
    );
    const version1Difficulty = within(version1Button).getByText("Normal");
    const sprite1 = within(version1Button).getByAltText(
      "The menu sprite of Mudkip from the Generation 3 and 4 Pokemon games."
    );
    const sprite2 = within(version1Button).getByAltText(
      "The menu sprite of Gloom from the Generation 3 and 4 Pokemon games."
    );
    const sprite3 = within(version1Button).getByAltText(
      "The menu sprite of Politoed from the Generation 3 and 4 Pokemon games."
    );
    const name1 = within(version1Button).getByText("Mudkip");
    const name2 = within(version1Button).getByText("Gloom");
    const name3 = within(version1Button).getByText("Politoed");

    expect(version1Image).toBeInTheDocument();
    expect(version1Difficulty).toBeInTheDocument();
    expect(sprite1).toBeInTheDocument();
    expect(sprite2).toBeInTheDocument();
    expect(sprite3).toBeInTheDocument();
    expect(name1).toBeInTheDocument();
    expect(name2).toBeInTheDocument();
    expect(name3).toBeInTheDocument();
  });

  test("Version2", () => {
    render(<Homepage gameData={gameData} chooseGameVersion={mockFunction} />, {
      wrapper: BrowserRouter,
    });
    const main = screen.getByRole("main");
    const gameVersionButtons = within(main).getAllByRole("button");

    const version2Button = gameVersionButtons[1];
    const version2Image = within(version2Button).getByAltText(
      "A preview thumbnail of the Hard version of the game."
    );
    const version2Difficulty = within(version2Button).getByText("Hard");
    const sprite1 = within(version2Button).getByAltText(
      "The menu sprite of Pichu from the Generation 3 and 4 Pokemon games."
    );
    const sprite2 = within(version2Button).getByAltText(
      "The menu sprite of Graveler from the Generation 3 and 4 Pokemon games."
    );
    const sprite3 = within(version2Button).getByAltText(
      "The menu sprite of Slaking from the Generation 3 and 4 Pokemon games."
    );
    const name1 = within(version2Button).getByText("Pichu");
    const name2 = within(version2Button).getByText("Graveler");
    const name3 = within(version2Button).getByText("Slaking");

    expect(version2Image).toBeInTheDocument();
    expect(version2Difficulty).toBeInTheDocument();
    expect(sprite1).toBeInTheDocument();
    expect(sprite2).toBeInTheDocument();
    expect(sprite3).toBeInTheDocument();
    expect(name1).toBeInTheDocument();
    expect(name2).toBeInTheDocument();
    expect(name3).toBeInTheDocument();
  });

  test("Version3", () => {
    render(<Homepage gameData={gameData} chooseGameVersion={mockFunction} />, {
      wrapper: BrowserRouter,
    });
    const main = screen.getByRole("main");
    const gameVersionButtons = within(main).getAllByRole("button");

    const version3Button = gameVersionButtons[2];
    const version3Image = within(version3Button).getByAltText(
      "A preview thumbnail of the Weird version of the game."
    );
    const version3Difficulty = within(version3Button).getByText("Weird");
    const sprite1 = within(version3Button).getByAltText(
      "The menu sprite of Pikachu from the Generation 3 and 4 Pokemon games."
    );
    const sprite2 = within(version3Button).getByAltText(
      "The menu sprite of Charizard from the Generation 3 and 4 Pokemon games."
    );
    const sprite3 = within(version3Button).getByAltText(
      "The menu sprite of Snorlax from the Generation 3 and 4 Pokemon games."
    );
    const name1 = within(version3Button).getByText("Pikachu");
    const name2 = within(version3Button).getByText("Charizard");
    const name3 = within(version3Button).getByText("Snorlax");

    expect(version3Image).toBeInTheDocument();
    expect(version3Difficulty).toBeInTheDocument();
    expect(sprite1).toBeInTheDocument();
    expect(sprite2).toBeInTheDocument();
    expect(sprite3).toBeInTheDocument();
    expect(name1).toBeInTheDocument();
    expect(name2).toBeInTheDocument();
    expect(name3).toBeInTheDocument();
  });
});
