import { render, screen } from "@testing-library/react";
import DropdownMenu from "../../components/DropdownMenu";

global.visualViewport = { width: 900, height: 900 };
const gameData = {
  pokemonNames: ["Pikachu", "Charizard", "Snorlax"],
  imageDimensions: {
    width: 1440,
    height: 900,
  },
};
const handlePickedOption = jest.fn();

test("The component renders with its top left corner on the cursor", () => {
  render(
    <DropdownMenu
      imagePosition={{ x: 500, y: 500 }}
      clickPosition={{ x: 500, y: 500 }}
      clientPosition={{ x: 500, y: 500 }}
      imageBorder={{ top: 0, right: 1600, bottom: 1100, left: 0 }}
      gameData={gameData}
      gameVersion="version3"
      handlePickedOption={handlePickedOption}
    />
  );
  const dropdownElement = screen.getByTestId("dropdown-menu");
  const style = window.getComputedStyle(dropdownElement);
  expect(style.top).toBe("498px");
  expect(style.left).toBe("498px");
});

test("The dropdown's corner overlaps with the target area's center when clicked at the image bottom edge", () => {
  render(
    <DropdownMenu
      imagePosition={{ x: 500, y: 890 }}
      clickPosition={{ x: 500, y: 500 }}
      clientPosition={{ x: 500, y: 500 }}
      imageBorder={{ top: 0, right: 1600, bottom: 1100, left: 0 }}
      gameData={gameData}
      gameVersion="version3"
      handlePickedOption={handlePickedOption}
    />
  );
  const dropdownElement = screen.getByTestId("dropdown-menu");
  const style = window.getComputedStyle(dropdownElement);
  expect(style.top).toBe("916px");
});

test("The dropdown doesn't cross over the image when clicked near the image bottom edge", () => {
  render(
    <DropdownMenu
      imagePosition={{ x: 500, y: 800 }}
      clickPosition={{ x: 500, y: 500 }}
      clientPosition={{ x: 500, y: 500 }}
      imageBorder={{ top: 0, right: 1600, bottom: 1100, left: 0 }}
      gameData={gameData}
      gameVersion="version3"
      handlePickedOption={handlePickedOption}
    />
  );
  const dropdownElement = screen.getByTestId("dropdown-menu");
  const style = window.getComputedStyle(dropdownElement);
  expect(style.top).toBe("348px");
});

test("The dropdown's corner overlaps with the target area's center when clicked at the image top edge", () => {
  render(
    <DropdownMenu
      imagePosition={{ x: 500, y: 10 }}
      clickPosition={{ x: 500, y: 500 }}
      clientPosition={{ x: 500, y: 500 }}
      imageBorder={{ top: 0, right: 1600, bottom: 1100, left: 0 }}
      gameData={gameData}
      gameVersion="version3"
      handlePickedOption={handlePickedOption}
    />
  );
  const dropdownElement = screen.getByTestId("dropdown-menu");
  const style = window.getComputedStyle(dropdownElement);
  expect(style.top).toBe("34px");
});

test("The dropdown stays in the viewport when clicked near the bottom of the viewport bottom edge", () => {
  global.visualViewport = { ...global.visualViewport, offsetTop: 100 };
  render(
    <DropdownMenu
      imagePosition={{ x: 500, y: 500 }}
      clickPosition={{ x: 500, y: 500 }}
      clientPosition={{ x: 500, y: 890 }}
      imageBorder={{ top: 0, right: 1600, bottom: 1100, left: 0 }}
      gameData={gameData}
      gameVersion="version3"
      handlePickedOption={handlePickedOption}
    />
  );
  const dropdownElement = screen.getByTestId("dropdown-menu");
  const style = window.getComputedStyle(dropdownElement);
  expect(style.top).toBe("348px");
});

test("The dropdown's corner overlaps with the target area's center when clicked at the image right edge", () => {
  render(
    <DropdownMenu
      imagePosition={{ x: 1430, y: 500 }}
      clickPosition={{ x: 500, y: 500 }}
      clientPosition={{ x: 500, y: 500 }}
      imageBorder={{ top: 0, right: 1600, bottom: 1100, left: 0 }}
      gameData={gameData}
      gameVersion="version3"
      handlePickedOption={handlePickedOption}
    />
  );
  const dropdownElement = screen.getByTestId("dropdown-menu");
  const style = window.getComputedStyle(dropdownElement);
  expect(style.left).toBe("1441px");
});

test("The dropdown doesn't cross over the image when clicked near the image right edge", () => {
  render(
    <DropdownMenu
      imagePosition={{ x: 1400, y: 500 }}
      clickPosition={{ x: 500, y: 500 }}
      clientPosition={{ x: 500, y: 500 }}
      imageBorder={{ top: 0, right: 1600, bottom: 1100, left: 0 }}
      gameData={gameData}
      gameVersion="version3"
      handlePickedOption={handlePickedOption}
    />
  );
  const dropdownElement = screen.getByTestId("dropdown-menu");
  const style = window.getComputedStyle(dropdownElement);
  expect(style.left).toBe("373px");
});

test("The dropdown's corner overlaps with the target area's center when clicked at the image left edge", () => {
  render(
    <DropdownMenu
      imagePosition={{ x: 10, y: 500 }}
      clickPosition={{ x: 500, y: 500 }}
      clientPosition={{ x: 500, y: 500 }}
      imageBorder={{ top: 0, right: 1600, bottom: 1100, left: 0 }}
      gameData={gameData}
      gameVersion="version3"
      handlePickedOption={handlePickedOption}
    />
  );
  const dropdownElement = screen.getByTestId("dropdown-menu");
  const style = window.getComputedStyle(dropdownElement);
  expect(style.left).toBe("34px");
});

test("The dropdown stays in the viewport when clicked near the right of the viewport right edge", () => {
  global.visualViewport = { ...global.visualViewport, pageLeft: 100 };
  render(
    <DropdownMenu
      imagePosition={{ x: 500, y: 500 }}
      clickPosition={{ x: 890, y: 500 }}
      clientPosition={{ x: 500, y: 500 }}
      imageBorder={{ top: 0, right: 1600, bottom: 1100, left: 0 }}
      gameData={gameData}
      gameVersion="version3"
      handlePickedOption={handlePickedOption}
    />
  );
  const dropdownElement = screen.getByTestId("dropdown-menu");
  const style = window.getComputedStyle(dropdownElement);
  expect(style.left).toBe("763px");
});
