import React from "react";
import Header from "../Header";
import { render, fireEvent, screen } from "@testing-library/react";
// import { renderHook, act } from "@testing-library/react-hooks";
import "@testing-library/jest-dom/extend-expect";

beforeEach(() => {
  jest.useRealTimers();
});

test("Trying how getBy.. works", () => {
  const handleDialogOpen = jest.fn();
  const handleTodoNextDay = jest.fn();
  const currentDate = new Date().toISOString().slice(0, 10);

  render(
    <Header
      handleDialogOpen={handleDialogOpen}
      handleTodoNextDay={handleTodoNextDay}
      currentDate={currentDate}
    />
  );

  const headingElement = screen.getByRole("heading",{name: "TODO"});
  expect(headingElement).toBeInTheDocument();
});


test("checking for current datee", () => {
  const handleDialogOpen = jest.fn();
  const handleTodoNextDay = jest.fn();
  const currentDate = new Date().toISOString().slice(0, 10);

  const { getByTestId } = render(
    <Header
      handleDialogOpen={handleDialogOpen}
      handleTodoNextDay={handleTodoNextDay}
      currentDate={currentDate}
    />
  );

  const date = getByTestId("date");

  expect(date.textContent).toBe("Today");
});

test("Test to ensure that backwards arrow work correctly and the date content is changed respectively", () => {
  const handleDialogOpen = jest.fn();
  const handleTodoNextDay = jest.fn();
  const currentDate = new Date("03/11/2022").toISOString().slice(0, 10);

  const { getByTestId } = render(
    <Header
      handleDialogOpen={handleDialogOpen}
      handleTodoNextDay={handleTodoNextDay}
      currentDate={currentDate}
    />
  );

  const backwardsButton = getByTestId("backward-button");
  const date = getByTestId("date");

  fireEvent.click(backwardsButton);
  expect(handleTodoNextDay).toHaveBeenCalledTimes(1);

  expect(date.textContent).toBe("2022-03-11");
});

test("Test to ensure that forward arrows work correctly and the date content is changed respectively", () => {
  const handleDialogOpen = jest.fn();
  const handleTodoNextDay = jest.fn();
  const currentDate = new Date("03/14/2022").toISOString().slice(0, 10);

  const { getByTestId } = render(
    <Header
      handleDialogOpen={handleDialogOpen}
      handleTodoNextDay={handleTodoNextDay}
      currentDate={currentDate}
    />
  );

  const forwardButton = getByTestId("forward-button");
  const date = getByTestId("date");

  fireEvent.click(forwardButton);
  expect(handleTodoNextDay).toHaveBeenCalledTimes(1);
  expect(date.textContent).toBe("2022-03-14");
});


