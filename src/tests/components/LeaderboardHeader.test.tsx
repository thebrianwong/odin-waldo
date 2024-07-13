import { render, screen } from "@testing-library/react";
import LeaderboardHeader from "../../components/LeaderboardHeader";
import "@testing-library/jest-dom";
import { AppRouterContextProviderMock } from "../utils";

test("The component gets rendered correctly", () => {
  render(
    <AppRouterContextProviderMock
      router={{ push: jest.fn() }}
      params={{ gameVersion: "normal" }}
    >
      <LeaderboardHeader />
    </AppRouterContextProviderMock>
  );
  const header = screen.getByRole("heading");
  expect(header).toBeInTheDocument();
});

describe("The header is based on the params", () => {
  test("Normal", () => {
    render(
      <AppRouterContextProviderMock
        router={{ push: jest.fn() }}
        params={{ gameVersion: "normal" }}
      >
        <LeaderboardHeader />
      </AppRouterContextProviderMock>
    );
    const header = screen.getByRole("heading");
    expect(header).toHaveTextContent("Normal");
  });

  test("Hard", () => {
    render(
      <AppRouterContextProviderMock
        router={{ push: jest.fn() }}
        params={{ gameVersion: "hard" }}
      >
        <LeaderboardHeader />
      </AppRouterContextProviderMock>
    );
    const header = screen.getByRole("heading");
    expect(header).toHaveTextContent("Hard");
  });
  test("Weird", () => {
    render(
      <AppRouterContextProviderMock
        router={{ push: jest.fn() }}
        params={{ gameVersion: "weird" }}
      >
        <LeaderboardHeader />
      </AppRouterContextProviderMock>
    );
    const header = screen.getByRole("heading");
    expect(header).toHaveTextContent("Weird");
  });
});
