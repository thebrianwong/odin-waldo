import { render, screen } from "@testing-library/react";
import { gameData as data } from "../../gameData";
import GameVersionCard from "../../components/GameVersionCard";
import userEvent from "@testing-library/user-event";

test("The component gets rendered correctly", () => {
  render(
    <GameVersionCard
      difficulty={"Normal"}
      gameData={data.version1}
      gameVersion="version1"
      chooseGameVersion={jest.fn()}
    />
  );
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});

test("The difficulty and alt text are rendered properly based on the difficulty prop", () => {
  render(
    <GameVersionCard
      difficulty={"Normal"}
      gameData={data.version1}
      gameVersion="version1"
      chooseGameVersion={jest.fn()}
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
      difficulty={"Normal"}
      gameData={data.version1}
      gameVersion="version1"
      chooseGameVersion={jest.fn()}
    />
  );
  const image = screen.getByTestId("preview-image");
  expect(image).toBeInTheDocument();
});

test("The component handles clicks", () => {
  const dummyFunction = jest.fn();
  render(
    <GameVersionCard
      difficulty={"Normal"}
      gameData={data.version1}
      gameVersion="version1"
      chooseGameVersion={dummyFunction}
    />
  );
  const button = screen.getByRole("button");
  userEvent.click(button);
  expect(dummyFunction).toHaveBeenCalled();
});
