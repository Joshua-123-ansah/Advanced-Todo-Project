import React from "react";
import {
  render as rtlRender,
  fireEvent,
  screen,
  getByLabelText,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { store } from "../store/store";
import { Provider } from "react-redux";
// import "BrowserAnimationsModule";
import App from "../App";

beforeEach(() => {
  jest.useRealTimers();
});

const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

const addTodo = (todos) => {
  todos.forEach((todo) => {
    const buttonElemment = screen.getByTestId("fab-button");
    fireEvent.click(buttonElemment);

    const todoTextInputField = screen.getByPlaceholderText("Todo Text.....");
    fireEvent.change(todoTextInputField, { target: { value: todo } });

    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
  });
};

describe("App", () => {
  const currentDate = new Date().toISOString().slice(0, 10);
  test("Testing whether when the fab button is clicked dialog will display", () => {
    render(<App />);

    // const buttonElemment = screen.getByRole("button", { name:/add/i});
    const buttonElemment = screen.getByTestId("fab-button");
    fireEvent.click(buttonElemment);

    const todoTitle = screen.getByText("Add Todo");

    expect(todoTitle).toBeInTheDocument();
  });

  test("Checkong the Todo Text Field has it placeholder and value", () => {
    render(<App />);

    // const buttonElemment = screen.getByRole("button", { name:/add/i});
    const buttonElemment = screen.getByTestId("fab-button");
    fireEvent.click(buttonElemment);

    const todoText = screen.getByPlaceholderText("Todo Text.....");

    expect(todoText).toBeInTheDocument();
    expect(todoText.value).toBe("");
  });

  test("Checkong the Todo Text Field has it placeholder and value", () => {
    render(<App />);

    // const buttonElemment = screen.getByRole("button", { name:/add/i});
    const buttonElemment = screen.getByTestId("fab-button");
    fireEvent.click(buttonElemment);

    const priorityText = screen.getByTestId("Priority");
    expect(priorityText).toHaveTextContent("Low");
  });

  test("Checking the initial value of the date text field", () => {
    render(<App />);

    // const buttonElemment = screen.getByRole("button", { name:/add/i});
    const buttonElemment = screen.getByTestId("fab-button");
    fireEvent.click(buttonElemment);

    const dateContent = screen.getByLabelText("Due Date");
    expect(dateContent.value).toBe(currentDate);
  });

  test("Tracking Changes in all the input fields", () => {
    render(<App />);

    const buttonElemment = screen.getByTestId("fab-button");
    fireEvent.click(buttonElemment);

    //Text Input Field
    const todoTextInputField = screen.getByPlaceholderText("Todo Text.....");
    fireEvent.change(todoTextInputField, { target: { value: "Go to school" } });
    expect(todoTextInputField.value).toBe("Go to school");

    //Priority Input Field   NOTE=> Ask brother Yoofi how you can go about this
    // const priorityText = screen.getByTestId("Priority");
    // fireEvent.change(priorityText, { target: { value: "High" } });
    // expect(priorityText).toHaveTextContent("High");

    //Date Input Field
    const dateContent = screen.getByLabelText("Due Date");
    fireEvent.change(date, { target: { value: "2022-05-04" } });
    expect(dateContent.value).toBe("2022-05-04");
  });

  test("Checking whether when the add button is clicked the dialog box will close", () => {
    render(<App />);

    const buttonElemment = screen.getByTestId("fab-button");
    fireEvent.click(buttonElemment);

    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);

    const todoTitle = screen.getByText("Add Todo");

    expect(todoTitle).not.toContain("Add Todo");
  });

  test("Checking if todo will display in the todolist when the add button is clicked", () => {
    render(<App />);

    addTodo(["Do my Chalkboard Task"]);

    const element = screen.getByText("Do my Chalkboard Task");
    expect(element).toBeInTheDocument();
  });

  //   test("List of Todos", () => {
  //     render(<App />);

  //     addTodo([
  //       "Do my Chalkboard Task",
  //       "Do the Figma Design for SE project",
  //       "Call My Mother",
  //     ]);
  //     const elements = screen.getAllByTestId("todoid");
  //     expect(elements.length).toBe(3);
  //   });

  // test("Check for whether a todo deletes when the delete button is clicked", () => {
  //   render(<App />);

  //   addTodo(["Do my Chalkboard Task"]);

  //   const deleteIcon = screen.getByTitle("deleteIcon");
  // });

  //TRYING ANOTHER STRATEGY
  // test("Check for whether a todo deletes when the delete button is clicked",()=>{
  //   render(<App />);

  //   const buttonElemment = screen.getByTestId("fab-button");
  //   fireEvent.click(buttonElemment);

  //   const todoTextInputField = screen.getByPlaceholderText("Todo Text.....");
  //   fireEvent.change(todoTextInputField, { target: { value: "Go to school" } });

  //   const addButton = screen.getByRole("button", { name: "Add" });
  //   fireEvent.click(addButton);

  //   const deleteIcon = screen.getByTitle("deleteIcon");
  // })
});
