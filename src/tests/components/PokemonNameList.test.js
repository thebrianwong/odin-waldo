import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PokemonNameList from "../../components/PokemonNameList";

const gameData = { pokemonNames: ["Pichu", "Graveler", "Slaking"] };
const mockFunction = jest.fn();

test("The component gets rendered", () => {
  render(
    <PokemonNameList
      gameData={gameData}
      gameVersion="version2"
      handlePickedOption={mockFunction}
    />
  );
  const element = screen.getByRole("list");
  expect(element).toBeInTheDocument();
});

test("There are 3 list items for the 3 Pokemon names", () => {
  render(
    <PokemonNameList
      gameData={gameData}
      gameVersion="version2"
      handlePickedOption={mockFunction}
    />
  );
  const listItems = screen.getAllByRole("listitem");
  expect(listItems.length).toBe(3);
});

test("Each list item has an image and a Pokemon name", () => {
  render(
    <PokemonNameList
      gameData={gameData}
      gameVersion="version2"
      handlePickedOption={mockFunction}
    />
  );
  const listItems = screen.getAllByRole("listitem");
  const pichuItem = listItems[0];
  const gravelerItem = listItems[1];
  const slakingItem = listItems[2];
  const pichuImage = within(pichuItem).getByAltText(
    "The menu sprite of Pichu from the Generation 3 and 4 Pokemon games."
  );
  const pichuName = within(pichuItem).getByText("Pichu");
  const gravelerImage = within(gravelerItem).getByAltText(
    "The menu sprite of Graveler from the Generation 3 and 4 Pokemon games."
  );
  const gravelerName = within(gravelerItem).getByText("Graveler");
  const slakingImage = within(slakingItem).getByAltText(
    "The menu sprite of Slaking from the Generation 3 and 4 Pokemon games."
  );
  const slakingName = within(slakingItem).getByText("Slaking");
  expect(pichuImage).toBeInTheDocument();
  expect(pichuName).toBeInTheDocument();
  expect(gravelerImage).toBeInTheDocument();
  expect(gravelerName).toBeInTheDocument();
  expect(slakingImage).toBeInTheDocument();
  expect(slakingName).toBeInTheDocument();
});

test("The list items can handle clicks", () => {
  render(
    <PokemonNameList
      gameData={gameData}
      gameVersion="version2"
      handlePickedOption={mockFunction}
    />
  );
  const listItems = screen.getAllByRole("listitem");
  const pichuItem = listItems[0];
  const gravelerItem = listItems[1];
  const slakingItem = listItems[2];
  userEvent.click(pichuItem);
  userEvent.click(gravelerItem);
  userEvent.click(slakingItem);
  expect(mockFunction).toBeCalledTimes(3);
});
