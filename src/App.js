import { Container, CssBaseline } from "@material-ui/core";
import { useState, useEffect } from "react";
import DialogComponent from "./component/DialogComponent";
import Header from "./Header";
import uuid from "react-uuid";
import TodoDisplayComponent from "./component/TodoDisplayComponent";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setOpenDialog, setCloseDialog } from "./Features/Dialog";
import { setIsEditMode, setCloseEditMode } from "./Features/Edit";
import { setMainTodos } from "./Features/MainTodos";
import { setTodos } from "./Features/Todos";

const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().slice(0, 10);
};

function App() {
  const [editTodo, setEditTodo] = useState({});

  //This is a local state so there is no need to add it to redux
  const [currentDate, setCurrentDate] = useState(getCurrentDate());

  //useSelectors
  const isEditMode = useSelector((state) => state.edit.value);
  const mainTodos = useSelector((state) => state.mainTodos.value);
  const todos = useSelector((state) => state.todos.value);

  //dispatch
  const dispatch = useDispatch();

  const handleDialogOpen = () => {
    dispatch(setOpenDialog());

    if (isEditMode) {
      dispatch(setIsEditMode());
    }
  };

  const handleDialogClose = () => {
    dispatch(setCloseDialog());
    dispatch(setCloseEditMode());
  };

  const handleSubmit = (data) => {
    if (!isEditMode) {
      dispatch(
        setMainTodos([
          ...mainTodos,
          {
            id: uuid(),
            val: data.val,
            priority: data.priority,
            due: data.dueDate,
          },
        ])
      );
    } else {
      const currentTodo = todos.filter((t) => t.id !== editTodo.id);
      dispatch(
        setTodos([
          ...currentTodo,
          {
            id: uuid(),
            val: data.val,
            priority: data.priority,
            due: data.dueDate,
          },
        ])
      );
    }
  };

  useEffect(() => {
    handleRenderTodo();
  }, [mainTodos]);

  const handleRenderTodo = () => {
    const newTodos = [...mainTodos];
    const currentTodos = [
      ...newTodos.filter((todo) => todo.due == getCurrentDate()),
    ];
    dispatch(setTodos(currentTodos));
  };

  const handleDelete = (id) => {
    const newTodos = [...todos];
    dispatch(setTodos([...newTodos.filter((todo) => todo.id !== id)]));
  };

  const handleEditClick = (todo) => {
    setEditTodo(todo);
    dispatch(setIsEditMode());
    dispatch(setOpenDialog());
  };

  const handleNext = (data) => {
    const newData = data;
    delete mainTodos[data.id];
    let date = new Date(newData.due);
    let dayOfDate = date.getDate();
    date.setDate(dayOfDate + 1);

    const currentTodos = [...mainTodos.filter((todo) => todo.id !== data.id)];

    dispatch(
      setMainTodos([
        ...currentTodos,
        {
          id: newData.id,
          val: newData.val,
          priority: newData.priority,
          due: date.toISOString().slice(0, 10),
        },
      ])
    );
  };

  const handleTodoNextDay = (action) => {
    let date = new Date(currentDate);
    let dayOfDate = date.getDate();
    if (action == "next") {
      date.setDate(dayOfDate + 1);
    } else {
      date.setDate(dayOfDate - 1);
    }

    const filterDate = date.toISOString().slice(0, 10);
    const newTodos = [...mainTodos];
    const currentTodos = [...newTodos.filter((todo) => todo.due == filterDate)];
    dispatch(setTodos(currentTodos));
    setCurrentDate(filterDate);
  };

  return (
    <>
      <CssBaseline />
      <Container>
        <Header
          handleDialogOpen={handleDialogOpen}
          handleTodoNextDay={handleTodoNextDay}
          currentDate={currentDate}
        />
        <TodoDisplayComponent
          todos={todos}
          handleDelete={handleDelete}
          handleEditClick={handleEditClick}
          handleNext={handleNext}
        />
      </Container>
      <DialogComponent
        handleDialogClose={handleDialogClose}
        handleSubmit={handleSubmit}
        editTodo={editTodo}
        isEditMode={isEditMode}
      />
    </>
  );
}

export default App;
