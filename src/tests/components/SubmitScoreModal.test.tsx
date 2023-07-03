import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SubmitScoreModal from "../../components/SubmitScoreModal/SubmitScoreModal";

const mockFunction = jest.fn();

test("The component renders", () => {
  render(
    <SubmitScoreModal
      timeScore={123}
      displayTime="00:00"
      gameVersion="version1"
      submitScore={mockFunction}
      closeModal={mockFunction}
    />
  );
  const modalBackground = screen.getByTestId("modal-background");
  expect(modalBackground).toBeInTheDocument();
  const modal = within(modalBackground).getByTestId("modal");
  expect(modal).toBeInTheDocument();
});

test("The display time is displayed properly", () => {
  render(
    <SubmitScoreModal
      timeScore={123}
      displayTime="00:00"
      gameVersion="version1"
      submitScore={mockFunction}
      closeModal={mockFunction}
    />
  );
  const time = screen.getByText("Score: 00:00");
  expect(time).toBeInTheDocument();
});

test("The name input is auto-focused", () => {
  render(
    <SubmitScoreModal
      timeScore={123}
      displayTime="00:00"
      gameVersion="version1"
      submitScore={mockFunction}
      closeModal={mockFunction}
    />
  );
  act(() => {
    userEvent.keyboard("a");
  });
  const nameInputWithA = screen.getByDisplayValue("a");
  expect(nameInputWithA).toBeInTheDocument();
});

test("Player name and favorite Pokemon can be typed in", () => {
  render(
    <SubmitScoreModal
      timeScore={123}
      displayTime="00:00"
      gameVersion="version1"
      submitScore={mockFunction}
      closeModal={mockFunction}
    />
  );
  act(() => {
    userEvent.keyboard("Ash");
  });
  const nameInput = screen.getByDisplayValue("Ash");
  const emptyFavoriteInput = screen.getByDisplayValue("");
  emptyFavoriteInput.focus();
  act(() => {
    userEvent.keyboard("Pikachu");
  });
  expect(nameInput).toBeInTheDocument();
  expect(emptyFavoriteInput).toHaveValue("Pikachu");
});

test("The modal can be closed in 3 ways without submitting a score", () => {
  render(
    <SubmitScoreModal
      timeScore={123}
      displayTime="00:00"
      gameVersion="version1"
      submitScore={mockFunction}
      closeModal={mockFunction}
    />
  );
  act(() => {
    userEvent.keyboard("{Escape}");
  });
  const modalBackground = screen.getByTestId("modal-background");
  act(() => {
    userEvent.click(modalBackground);
  });
  const exitButton = screen.getByRole("button", { name: "X" });
  act(() => {
    userEvent.click(exitButton);
  });
  expect(mockFunction).toBeCalledTimes(3);
});

test("The modal does not close when clicked due to propagation", () => {
  render(
    <SubmitScoreModal
      timeScore={123}
      displayTime="00:00"
      gameVersion="version1"
      submitScore={mockFunction}
      closeModal={mockFunction}
    />
  );
  const modal = screen.getByTestId("modal");
  act(() => {
    userEvent.click(modal);
  });
  expect(mockFunction).not.toBeCalled();
});

test("The score can be submitted in 3 ways", () => {
  const submitMock = jest.fn().mockReturnValue({ success: true });
  render(
    <SubmitScoreModal
      timeScore={123}
      displayTime="00:00"
      gameVersion="version1"
      submitScore={submitMock}
      closeModal={mockFunction}
    />
  );
  act(() => {
    userEvent.keyboard("{Enter}");
  });
  const favoriteInput = screen.getAllByDisplayValue("")[1];
  favoriteInput.focus();
  act(() => {
    userEvent.keyboard("{Enter}");
  });
  const submitButton = screen.getByRole("button", { name: "Submit Score" });
  act(() => {
    userEvent.click(submitButton);
  });
  expect(submitMock).toBeCalledTimes(3);
});

test("The modal is closed when the the score is successfully submitted", async () => {
  const submitMock = jest.fn().mockResolvedValue({ success: true });
  const closeMock = jest.fn();
  render(
    <SubmitScoreModal
      timeScore={123}
      displayTime="00:00"
      gameVersion="version1"
      submitScore={submitMock}
      closeModal={closeMock}
    />
  );
  const submitButton = screen.getByRole("button", { name: "Submit Score" });
  act(() => {
    userEvent.click(submitButton);
  });
  expect(submitMock).toBeCalledTimes(1);
  await new Promise(process.nextTick);
  expect(closeMock).toBeCalledTimes(1);
});

test("The modal is not closed if the score is not submitted successfully", async () => {
  const submitMock = jest
    .fn()
    .mockResolvedValue({ success: false, message: "Error message" });
  const closeMock = jest.fn();
  render(
    <SubmitScoreModal
      timeScore={123}
      displayTime="00:00"
      gameVersion="version1"
      submitScore={submitMock}
      closeModal={closeMock}
    />
  );
  const submitButton = screen.getByRole("button", { name: "Submit Score" });
  act(() => {
    userEvent.click(submitButton);
  });
  expect(submitMock).toBeCalledTimes(1);
  await new Promise(process.nextTick);
  expect(closeMock).not.toBeCalled();
});
