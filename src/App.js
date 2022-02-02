import { Container, CssBaseline } from "@material-ui/core";
import { useState, useEffect } from "react";
import DialogComponent from "./component/DialogComponent";
import Header from "./Header";
import uuid from "react-uuid";
import TodoDisplayComponent from "./component/TodoDisplayComponent";

const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().slice(0, 10);
};

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [mainTodos, setMainTodos] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState({});
  const [currentDate,setCurrentDate] = useState(getCurrentDate());
  

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
    if (isEditMode) {
      setIsEditMode(true);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setIsEditMode(false);
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
      const newTodos = [...todos];
      const currentTodo = newTodos.find((t) => t.id === editTodo.id);
      currentTodo.val = data.val;
      currentTodo.priority = data.priority;
      currentTodo.due = data.dueDate;
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
    setIsEditMode(true);
    setIsDialogOpen(true);
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
    if(action=="next"){
      date.setDate(dayOfDate + 1);
    }
    else{
      date.setDate(dayOfDate - 1);
    }
    
    const filterDate=date.toISOString().slice(0, 10);
    const newTodos = [...mainTodos];
    const currentTodos = [
      ...newTodos.filter((todo) => todo.due == filterDate),
    ];
    setTodos(currentTodos);
    setCurrentDate(filterDate)
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
        open={isDialogOpen}
        handleSubmit={handleSubmit}
        editTodo={editTodo}
        isEditMode={isEditMode}
      />
    </>
  );
}

export default App;
