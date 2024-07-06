import { render, screen } from "@testing-library/react";
import AnswerReaction from "../../components/AnswerReaction/AnswerReaction";
import "@testing-library/jest-dom";

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

test("The component can be queried via test id", () => {
  render(
    <AnswerReaction
      isCorrect={false}
      imagePosition={{ x: 100, y: 100 }}
      clickPosition={{ x: 100, y: 100 }}
      gameData={{
        pokemonNames: ["Pikachu"],
        imageDimensions: { width: 200, height: 200 },
      }}
    />
  );
  const element = screen.getByTestId("answer-reaction");
  expect(element).toBeInTheDocument();
});

test("The appropriate image is shown when the answer is correct", () => {
  render(
    <AnswerReaction
      isCorrect={true}
      imagePosition={{ x: 100, y: 100 }}
      clickPosition={{ x: 100, y: 100 }}
      gameData={{
        pokemonNames: ["Pikachu"],
        imageDimensions: { width: 200, height: 200 },
      }}
    />
  );
  const correctImageAltText = screen.getByAltText(
    "Winking Pikachu posing with the V sign, indicating a correct answer."
  );
  expect(correctImageAltText).toBeInTheDocument();
});

test("The appropriate image is shown when the answer is incorrect", () => {
  render(
    <AnswerReaction
      isCorrect={false}
      imagePosition={{ x: 100, y: 100 }}
      clickPosition={{ x: 100, y: 100 }}
      gameData={{
        pokemonNames: ["Pikachu"],
        imageDimensions: { width: 200, height: 200 },
      }}
    />
  );
  const incorrectImageAltText = screen.getByAltText(
    "Frowning Pikachu making an X sign with its arms with a blue X behind it, indicating an incorrect answer."
  );
  expect(incorrectImageAltText).toBeInTheDocument();
});

test("The component is green when the answer is correct", () => {
  render(
    <AnswerReaction
      isCorrect={true}
      imagePosition={{ x: 100, y: 100 }}
      clickPosition={{ x: 100, y: 100 }}
      gameData={{
        pokemonNames: ["Pikachu"],
        imageDimensions: { width: 200, height: 200 },
      }}
    />
  );
  const correctElement = screen.getByTestId("answer-reaction");
  expect(correctElement).toBeInTheDocument();

  const style = window.getComputedStyle(correctElement);
  expect(style.backgroundColor).toBe("rgba(116, 255, 98, 0.78)");
  expect(style.borderColor).toBe("green");
});

test("The component is red when the answer is incorrect", () => {
  render(
    <AnswerReaction
      isCorrect={false}
      imagePosition={{ x: 100, y: 100 }}
      clickPosition={{ x: 100, y: 100 }}
      gameData={{
        pokemonNames: ["Pikachu"],
        imageDimensions: { width: 200, height: 200 },
      }}
    />
  );
  const incorrectElement = screen.getByTestId("answer-reaction");
  expect(incorrectElement).toBeInTheDocument();

  const style = window.getComputedStyle(incorrectElement);
  expect(style.backgroundColor).toBe("rgba(255, 98, 116, 0.78)");
  expect(style.borderColor).toBe("red");
});

test("The component has the appropriate top styling when not clicking near the image or viewport bottom edge", () => {
  render(
    <AnswerReaction
      isCorrect={false}
      imagePosition={{ x: 100, y: 100 }}
      clickPosition={{ x: 100, y: 100 }}
      gameData={{
        pokemonNames: ["Pikachu"],
        imageDimensions: { width: 1200, height: 1200 },
      }}
    />
  );
  const element = screen.getByTestId("answer-reaction");
  expect(element).toBeInTheDocument();

  const style = window.getComputedStyle(element);
  expect(style.top).toBe("100px");
});

test("The component has the appropriate top styling when clicking near the image bottom edge", () => {
  global.visualViewport = {
    ...defaultVisualViewport,
    width: 1900,
    height: 1900,
  };
  render(
    <AnswerReaction
      isCorrect={false}
      imagePosition={{ x: 100, y: 1100 }}
      clickPosition={{ x: 100, y: 1100 }}
      gameData={{
        pokemonNames: ["Pikachu"],
        imageDimensions: { width: 1200, height: 1200 },
      }}
    />
  );
  const element = screen.getByTestId("answer-reaction");
  expect(element).toBeInTheDocument();

  const style = window.getComputedStyle(element);
  expect(style.top).toBe("990px");
});

test("The component has the appropriate top styling when clicking near the viewport bottom edge", () => {
  global.visualViewport = {
    ...defaultVisualViewport,
    width: 900,
    height: 900,
    offsetTop: 0,
  };
  render(
    <AnswerReaction
      isCorrect={false}
      imagePosition={{ x: 100, y: 850 }}
      clickPosition={{ x: 100, y: 850 }}
      gameData={{
        pokemonNames: ["Pikachu"],
        imageDimensions: { width: 1600, height: 1600 },
      }}
    />
  );
  const element = screen.getByTestId("answer-reaction");
  expect(element).toBeInTheDocument();

  const style = window.getComputedStyle(element);
  expect(style.top).toBe("740px");
});

test("Scrolling down the page does not affect top styling when clicking near the viewport bottom edge", () => {
  global.visualViewport = {
    ...defaultVisualViewport,
    width: 900,
    height: 900,
    offsetTop: 150,
  };
  render(
    <AnswerReaction
      isCorrect={false}
      imagePosition={{ x: 100, y: 850 }}
      clickPosition={{ x: 100, y: 1000 }}
      gameData={{
        pokemonNames: ["Pikachu"],
        imageDimensions: { width: 1600, height: 1600 },
      }}
    />
  );
  const element = screen.getByTestId("answer-reaction");
  expect(element).toBeInTheDocument();

  const style = window.getComputedStyle(element);
  expect(style.top).toBe("890px");
});

test("The component has the appropriate left styling when not clicking near the image or viewport right edge", () => {
  render(
    <AnswerReaction
      isCorrect={false}
      imagePosition={{ x: 100, y: 100 }}
      clickPosition={{ x: 100, y: 100 }}
      gameData={{
        pokemonNames: ["Pikachu"],
        imageDimensions: { width: 1200, height: 1200 },
      }}
    />
  );
  const element = screen.getByTestId("answer-reaction");
  expect(element).toBeInTheDocument();

  const style = window.getComputedStyle(element);
  expect(style.left).toBe("100px");
});

test("The component has the appropriate left styling when clicking near the image right edge", () => {
  global.visualViewport = {
    ...defaultVisualViewport,
    width: 1900,
    height: 1900,
  };
  render(
    <AnswerReaction
      isCorrect={false}
      imagePosition={{ x: 1100, y: 100 }}
      clickPosition={{ x: 1100, y: 100 }}
      gameData={{
        pokemonNames: ["Pikachu"],
        imageDimensions: { width: 1200, height: 1200 },
      }}
    />
  );
  const element = screen.getByTestId("answer-reaction");
  expect(element).toBeInTheDocument();

  const style = window.getComputedStyle(element);
  expect(style.left).toBe("990px");
});

test("The component has the appropriate left styling when clicking near the viewport right edge", () => {
  global.visualViewport = {
    ...defaultVisualViewport,
    width: 900,
    height: 900,
    pageLeft: 0,
  };
  render(
    <AnswerReaction
      isCorrect={false}
      imagePosition={{ x: 850, y: 100 }}
      clickPosition={{ x: 850, y: 100 }}
      gameData={{
        pokemonNames: ["Pikachu"],
        imageDimensions: { width: 1600, height: 1600 },
      }}
    />
  );
  const element = screen.getByTestId("answer-reaction");
  expect(element).toBeInTheDocument();

  const style = window.getComputedStyle(element);
  expect(style.left).toBe("740px");
});

test("Scrolling down the page does not affect left styling when clicking near the viewport right edge", () => {
  global.visualViewport = {
    ...defaultVisualViewport,
    width: 900,
    height: 900,
    pageLeft: 150,
  };
  render(
    <AnswerReaction
      isCorrect={false}
      imagePosition={{ x: 850, y: 100 }}
      clickPosition={{ x: 1000, y: 100 }}
      gameData={{
        pokemonNames: ["Pikachu"],
        imageDimensions: { width: 1600, height: 1600 },
      }}
    />
  );
  const element = screen.getByTestId("answer-reaction");
  expect(element).toBeInTheDocument();

  const style = window.getComputedStyle(element);
  expect(style.left).toBe("890px");
});
