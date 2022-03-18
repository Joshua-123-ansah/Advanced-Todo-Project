import React from "react";
import Header from "../Header";
import { render, fireEvent } from "@testing-library/react";
// import { renderHook, act } from "@testing-library/react-hooks";
import "@testing-library/jest-dom/extend-expect";

beforeEach(() => {
  jest.useRealTimers();
});

//Test to check whether the header of the Todo Project has the text TODO
test("check whether the header component has the text TODO", () => {
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

  const todo = getByTestId("todo");

  expect(todo.textContent).toBe("TODO");
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

test("Test for ensuring the Fab button is clicked once to enable the dialog box to open", () => {
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

  const button = getByTestId("fab-button");
  fireEvent.click(button);

  expect(handleDialogOpen).toHaveBeenCalledTimes(1);
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
