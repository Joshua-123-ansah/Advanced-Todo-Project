import { Container, CssBaseline } from "@material-ui/core";
import { useState, useEffect } from "react";
import DialogComponent from "./component/DialogComponent";
import Header from "./Header";
import uuid from "react-uuid";
import TodoDisplayComponent from "./component/TodoDisplayComponent";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./store/index";

const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().slice(0, 10);
};

function App() {
  const [editTodo, setEditTodo] = useState({});

  //This is a local state so there is no need to add it to redux
  const [currentDate, setCurrentDate] = useState(getCurrentDate());

  //useSelectors
  const isEditMode = useSelector((state) => state.edit);
  const mainTodos = useSelector((state) => state.mainTodo);
  const todos = useSelector((state) => state.todos);
  const t = useSelector((state) => state);
  console.log(t);

  //dispatch
  const dispatch = useDispatch();
  const {
    setOPenDialog,
    setCloseDialog,
    setIsEditMode,
    setCloseEditMode,
    setMainTodos,
    setTodos,
  } = bindActionCreators(actionCreators, dispatch);

  const handleDialogOpen = () => {
    setOPenDialog();

    if (isEditMode) {
      setIsEditMode();
    }
  };

  const handleDialogClose = () => {
    setCloseDialog();
    setCloseEditMode();
  };

  const handleSubmit = (data) => {
    if (!isEditMode) {
      setMainTodos([
        ...mainTodos,
        {
          id: uuid(),
          val: data.val,
          priority: data.priority,
          due: data.dueDate,
        },
      ]);
    } else {
      const currentTodo = todos.filter((t) => t.id !== editTodo.id);
      setTodos([
        ...currentTodo,
        {
          id: uuid(),
          val: data.val,
          priority: data.priority,
          due: data.dueDate,
        },
      ]);
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
    setTodos(currentTodos);
  };

  const handleDelete = (id) => {
    const newTodos = [...todos];
    setTodos([...newTodos.filter((todo) => todo.id !== id)]);
  };

  const handleEditClick = (todo) => {
    setEditTodo(todo);
    setIsEditMode();
    setOPenDialog();
  };

  const handleNext = (data) => {
    const newData = data;
    delete mainTodos[data.id];
    let date = new Date(newData.due);
    let dayOfDate = date.getDate();
    date.setDate(dayOfDate + 1);

    const currentTodos = [...mainTodos.filter((todo) => todo.id !== data.id)];

    setMainTodos([
      ...currentTodos,
      {
        id: newData.id,
        val: newData.val,
        priority: newData.priority,
        due: date.toISOString().slice(0, 10),
      },
    ]);
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
