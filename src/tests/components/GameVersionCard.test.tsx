import { render, screen } from "@testing-library/react";
import data from "../../gameData.json";
import GameVersionCard from "../../components/GameVersionCard/GameVersionCard";
import "@testing-library/jest-dom";

test("The component gets rendered correctly", () => {
  render(
    <GameVersionCard
      difficulty="Normal"
      gameData={data.version1}
      gameVersion="version1"
    />
  );
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});

test("The difficulty and alt text are rendered properly based on the difficulty prop", () => {
  render(
    <GameVersionCard
      difficulty="Normal"
      gameData={data.version1}
      gameVersion="version1"
    />
  );
  const difficulty = screen.getByText("Normal");
  const altText = screen.getByAltText(
    "A preview thumbnail of the Normal version of the game."
  );
  expect(difficulty).toBeInTheDocument();
  expect(altText).toBeInTheDocument();
});

test("The image corresponds to the gameVersion prop", () => {
  render(
    <GameVersionCard
      difficulty="Normal"
      gameData={data.version1}
      gameVersion="version1"
    />
  );
  const image = screen.getByTestId("preview-image");
  expect(image).toBeInTheDocument();
});
