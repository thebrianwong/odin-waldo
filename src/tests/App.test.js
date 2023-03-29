import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  query,
  Timestamp,
} from "firebase/firestore";
import { act } from "react-dom/test-utils";
import App from "../App";

const spyScrollTo = jest.fn();
Object.defineProperty(global.window, "scrollTo", { value: spyScrollTo });

jest.mock("firebase/app", () => {
  const mInitializeApp = jest.fn(() => {
    return true;
  });
  return { initializeApp: mInitializeApp };
});

jest.mock("firebase/firestore", () => {
  const mDocSnap = {
    exists: () => {
      return true;
    },
    data: () => {
      return true;
    },
  };

  const mAddDoc = () => Promise.resolve(true);
  const mCollection = () => true;
  const mCollectionGroup = () => true;
  const mDoc = () => true;
  const mGetDoc = () =>
    Promise.resolve(true).then(() => {
      return mDocSnap;
    });
  const mGetFirestore = () => true;
  const mOnSnapshot = () => {
    return {
      favoritePokemon: "Crobat",
      name: "Biff",
      score: 11005,
      timeStamp: "March 21, 2023 at 9:54:27PM UTC-7",
    };
  };
  const mQuery = () => {
    return {
      favoritePokemon: "Crobat",
      name: "Biff",
      score: 11005,
      timeStamp: "March 21, 2023 at 9:54:27PM UTC-7",
    };
  };
  const mTimeStamp = () => true;
  return {
    addDoc: mAddDoc,
    collection: mCollection,
    collectionGroup: mCollectionGroup,
    doc: mDoc,
    getDoc: mGetDoc,
    getFirestore: mGetFirestore,
    onSnapshot: mOnSnapshot,
    query: mQuery,
    Timestamp: mTimeStamp,
  };
});

afterEach(() => {
  cleanup();
  jest.resetModules();
  jest.resetAllMocks();
});

test("Navigation to the leaderboard page is possible", () => {
  render(<App />);
  expect(initializeApp).toHaveBeenCalled();
  const leaderboardButton = screen.getByRole("button", { name: "Leaderboard" });
  act(() => {
    userEvent.click(leaderboardButton);
  });
  const loadingScreen = screen.getByAltText(
    "A minimalist rendition of the classic Pokeball, with red and white semicircles separated by a line that meets in the middle to form another circle."
  );
  expect(loadingScreen).toBeInTheDocument();
});

test("Navigation to the game page is possible", () => {
  render(<App />);
  const main = screen.getByRole("main");
  const gameVersionButtons = within(main).getAllByRole("button");
  const normalButton = gameVersionButtons[0];
  act(() => {
    userEvent.click(normalButton);
  });
  const loadingScreen = screen.getByAltText(
    "A minimalist rendition of the classic Pokeball, with red and white semicircles separated by a line that meets in the middle to form another circle."
  );
  expect(loadingScreen).toBeInTheDocument();
});
