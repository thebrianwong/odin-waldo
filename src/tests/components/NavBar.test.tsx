import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import "@testing-library/jest-dom";

const gameData = {
  pokemonNames: ["Pichu", "Graveler", "Slaking"],
  imageDimensions: { width: 0, height: 0 },
};

test("The component is rendered", () => {
  render(
    <NavBar
      gameData={gameData}
      gameProgress={{ Pichu: false, Graveler: false, Slaking: false }}
      elapsedTime="00:00"
    />,
    { wrapper: BrowserRouter }
  );
  const navElement = screen.getByRole("navigation");
  expect(navElement).toBeInTheDocument();
});

test("2 buttons to navigate exist", () => {
  render(
    <NavBar
      gameData={gameData}
      gameProgress={{ Pichu: false, Graveler: false, Slaking: false }}
      elapsedTime="00:00"
    />,
    { wrapper: BrowserRouter }
  );
  const buttons = screen.getAllByRole("button");
  const homeButton = buttons[0];
  const leaderboardButton = buttons[1];
  expect(homeButton.textContent).toBe("Home");
  expect(leaderboardButton.textContent).toBe("Leaderboard");
});

test("The timer is displayed properly", () => {
  render(
    <NavBar
      gameData={gameData}
      gameProgress={{ Pichu: false, Graveler: false, Slaking: false }}
      elapsedTime="00:00"
    />,
    { wrapper: BrowserRouter }
  );
  const timerDisplay = screen.getByText("Time: 00:00");
  expect(timerDisplay).toBeInTheDocument();
});

test("The 3 Pokemon sprites are displayed", () => {
  render(
    <NavBar
      gameData={gameData}
      gameProgress={{ Pichu: false, Graveler: false, Slaking: false }}
      elapsedTime="00:00"
    />,
    { wrapper: BrowserRouter }
  );
  const pichuSprite = screen.getByAltText(
    "The sprite of Pichu as it appears as an opposing Pokemon in Pokemon HeartGold and SoulSilver."
  );
  const gravelerSprite = screen.getByAltText(
    "The sprite of Graveler as it appears as an opposing Pokemon in Pokemon HeartGold and SoulSilver."
  );
  const slakingSprite = screen.getByAltText(
    "The sprite of Slaking as it appears as an opposing Pokemon in Pokemon HeartGold and SoulSilver."
  );
  expect(pichuSprite).toBeInTheDocument();
  expect(gravelerSprite).toBeInTheDocument();
  expect(slakingSprite).toBeInTheDocument();
});

test("The sprites have default opacity when not found", () => {
  render(
    <NavBar
      gameData={gameData}
      gameProgress={{ Pichu: false, Graveler: false, Slaking: false }}
      elapsedTime="00:00"
    />,
    { wrapper: BrowserRouter }
  );
  const pichuSprite = screen.getByAltText(
    "The sprite of Pichu as it appears as an opposing Pokemon in Pokemon HeartGold and SoulSilver."
  );
  const gravelerSprite = screen.getByAltText(
    "The sprite of Graveler as it appears as an opposing Pokemon in Pokemon HeartGold and SoulSilver."
  );
  const slakingSprite = screen.getByAltText(
    "The sprite of Slaking as it appears as an opposing Pokemon in Pokemon HeartGold and SoulSilver."
  );
  const pichuElement = window.getComputedStyle(pichuSprite);
  const gravelerElement = window.getComputedStyle(gravelerSprite);
  const slakingElement = window.getComputedStyle(slakingSprite);
  expect(pichuElement.opacity).toBe("");
  expect(gravelerElement.opacity).toBe("");
  expect(slakingElement.opacity).toBe("");
});

test("The sprites have translucent opacity when found", () => {
  render(
    <NavBar
      gameData={gameData}
      gameProgress={{ Pichu: true, Graveler: true, Slaking: true }}
      elapsedTime="00:00"
    />,
    { wrapper: BrowserRouter }
  );
  const pichuSprite = screen.getByAltText(
    "The sprite of Pichu as it appears as an opposing Pokemon in Pokemon HeartGold and SoulSilver."
  );
  const gravelerSprite = screen.getByAltText(
    "The sprite of Graveler as it appears as an opposing Pokemon in Pokemon HeartGold and SoulSilver."
  );
  const slakingSprite = screen.getByAltText(
    "The sprite of Slaking as it appears as an opposing Pokemon in Pokemon HeartGold and SoulSilver."
  );
  const pichuElement = window.getComputedStyle(pichuSprite);
  const gravelerElement = window.getComputedStyle(gravelerSprite);
  const slakingElement = window.getComputedStyle(slakingSprite);
  expect(pichuElement.opacity).toBe("0.35");
  expect(gravelerElement.opacity).toBe("0.35");
  expect(slakingElement.opacity).toBe("0.35");
});
