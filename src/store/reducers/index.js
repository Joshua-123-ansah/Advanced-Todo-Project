import { combineReducers } from "redux";
import dialogReducer from "./Dialog";
import editReducer from "./Edit";
import mainTodoReducer from "./MainTodos";
import todosReducer from "./Todos";

const reducers = combineReducers({
  dialog: dialogReducer,
  edit: editReducer,
  mainTodo: mainTodoReducer,
  todos: todosReducer,
});

export default reducers;
