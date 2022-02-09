const initialStateValue = false;

const reducer = (state = initialStateValue, action) => {
  switch (action.type) {
    case "setOPenDialog":
      return (state = true);
    case "setCloseDialog":
      return (state = initialStateValue);
    default:
      return state;
  }
};

export default reducer;
