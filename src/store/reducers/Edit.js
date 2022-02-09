const initialStateValue = false;

const reducer = (state = initialStateValue,action) => {
  switch (action.type) {
    case "setIsEditMode":
      return (state = true);
    case "setCloseEditMode":
      return (state = initialStateValue);
    default:
      return state;
  }
};

export default reducer;
