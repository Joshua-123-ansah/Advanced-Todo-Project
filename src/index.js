import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import dialogReducer from "./Features/Dialog";
import editReducer from "./Features/Edit";
import mainTodoReducer from "./Features/MainTodos";
import todosReducer from "./Features/Todos";

var store = configureStore({
  reducer: {
    dialog: dialogReducer,
    edit: editReducer,
    mainTodos: mainTodoReducer,
    todos: todosReducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
reportWebVitals();
