import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = false;

export const dialogSlice = createSlice({
  name: "isDialogOpen",
  initialState: { value: initialStateValue },
  reducers: {
    setOpenDialog: (state) => {
      state.value = true;
    },
    setCloseDialog: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const { setOpenDialog, setCloseDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
