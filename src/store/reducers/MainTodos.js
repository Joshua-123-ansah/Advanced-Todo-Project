const initialStateValue = [];

const reducer = (state = initialStateValue,action) => {
  switch (action.type) {
    case "setMainTodos":
      return (state = action.payload);
    default:
      return state;
  }
};

export default reducer;