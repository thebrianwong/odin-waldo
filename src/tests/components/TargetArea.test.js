import { render, screen } from "@testing-library/react";
import TargetArea from "../../components/TargetArea/TargetArea";

test("The component render with the center of the circle on the click", () => {
  render(
    <TargetArea
      imagePosition={{ x: 500, y: 500 }}
      clickPosition={{ x: 500, y: 500 }}
      imageBorder={{ top: 0, right: 2000, bottom: 3000, left: 0 }}
      gameData={{ imageDimensions: { width: 1600, height: 2560 } }}
    />
  );
  const targetArea = screen.getByTestId("target-area");
  const style = window.getComputedStyle(targetArea);
  expect(style.top).toBe("473px");
  expect(style.left).toBe("473px");
});

test("The target area does not cross out of the image when clicked near the image bottom edge", () => {
  render(
    <TargetArea
      imagePosition={{ x: 500, y: 3000 }}
      clickPosition={{ x: 500, y: 500 }}
      imageBorder={{ top: 0, right: 2000, bottom: 3000, left: 0 }}
      gameData={{ imageDimensions: { width: 1600, height: 2560 } }}
    />
  );
  const targetArea = screen.getByTestId("target-area");
  const style = window.getComputedStyle(targetArea);
  expect(style.top).toBe("2941px");
});

test("The target area does not cross out of the image when clicked near the image top edge", () => {
  render(
    <TargetArea
      imagePosition={{ x: 500, y: 5 }}
      clickPosition={{ x: 500, y: 500 }}
      imageBorder={{ top: 0, right: 2000, bottom: 3000, left: 0 }}
      gameData={{ imageDimensions: { width: 1600, height: 2560 } }}
    />
  );
  const targetArea = screen.getByTestId("target-area");
  const style = window.getComputedStyle(targetArea);
  expect(style.top).toBe("7px");
});

test("The target area does not cross out of the image when clicked near the image right edge", () => {
  render(
    <TargetArea
      imagePosition={{ x: 3000, y: 500 }}
      clickPosition={{ x: 500, y: 500 }}
      imageBorder={{ top: 0, right: 2000, bottom: 3000, left: 0 }}
      gameData={{ imageDimensions: { width: 1600, height: 2560 } }}
    />
  );
  const targetArea = screen.getByTestId("target-area");
  const style = window.getComputedStyle(targetArea);
  expect(style.left).toBe("1941px");
});

test("The target area does not cross out of the image when clicked near the image left edge", () => {
  render(
    <TargetArea
      imagePosition={{ x: 5, y: 500 }}
      clickPosition={{ x: 500, y: 500 }}
      imageBorder={{ top: 0, right: 2000, bottom: 3000, left: 0 }}
      gameData={{ imageDimensions: { width: 1600, height: 2560 } }}
    />
  );
  const targetArea = screen.getByTestId("target-area");
  const style = window.getComputedStyle(targetArea);
  expect(style.left).toBe("7px");
});
