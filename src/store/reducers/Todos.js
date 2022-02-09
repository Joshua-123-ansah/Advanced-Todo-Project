const initialStateValue = [];

const reducer = (state = initialStateValue,action) => {
  switch (action.type) {
    case "setTodos":
      return (state = action.payload);
    default:
      return state;
  }
};

export default reducer;
