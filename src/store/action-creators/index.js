export const setOPenDialog = () => {
  return (dispatch) => (dispatch({ type: "setOPenDialog" }));
};

export const setCloseDialog = () => {
  return (dispatch) => (dispatch({ type: "setCloseDialog" }));
};

export const setIsEditMode = () => {
  return (dispatch) => (dispatch({ type: "setIsEditMode" }));
};

export const setCloseEditMode = () => {
  return (dispatch) => (dispatch({ type: "setCloseEditMode" }));
};

export const setMainTodos = (mainTodos) => {
  return (dispatch) => (dispatch({
    type: "setMainTodos",
    payload: mainTodos,
  }));
};

export const setTodos = (todos) => {
  return (dispatch) => (dispatch({
    type: "setTodos",
    payload: todos,
  }));
};
