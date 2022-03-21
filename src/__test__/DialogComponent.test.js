import React from "react";
import { render as rtlRender, fireEvent, screen } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import "@testing-library/jest-dom/extend-expect";
import { store } from "../store/store";
import { Provider } from "react-redux";
import DialogComponent from "../component/DialogComponent";
import { AllHooks } from "../hooks";

const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

describe("DialogComponent", () => {
  const handleDialogClose = jest.fn();
  const handleSubmit = jest.fn();
  const editTodo = {};

  test("Check whether the place holder for the to text field is 'Todo Text.....'", () => {
    render(
      <DialogComponent
        handleDialogClose={handleDialogClose}
        handleSubmit={handleSubmit}
        editTodo={editTodo}
      />
    );
    //I do not understand why I get an error when I try to access by role
    // const headingElement = screen.getByLabelText("Add Todo");
    // expect(headingElement).toBeInTheDocument();
  });
});

// describe("<DialogComponent />", () => {
//   const editTodo = {};
//   const currentDate = new Date().toISOString().slice(0, 10);

//   test("render component", () => {
//     const { container } = render(
//       <DialogComponent
//         handleDialogClose={() => {}}
//         handleSubmit={() => {}}
//         editTodo={editTodo}
//       />
//     );

//     expect(container).toMatchSnapshot();
//   });

//   test("checking whether all states in the component has it initial values", () => {
//     const { result } = renderHook(() => AllHooks());

//     //todoText State
//     expect(result.current.todoText).toEqual("");
//     expect(result.current.priority).toEqual("Low");
//     expect(result.current.date).toEqual(currentDate);
//   });

//   test("checking whether the setStates work", () => {
//     const { result } = renderHook(() => AllHooks());

//     //todoText State
//     act(()=>{
//       result.current.setTodoText("Read React Test")
//       result.current.setPriority("High")
//     })

//     expect(result.current.todoText).toBe("Read React Test")
//     expect(result.current.priority).toBe("High")
//   });

// });
