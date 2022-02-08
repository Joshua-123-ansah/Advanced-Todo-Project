import { createSlice } from "@reduxjs/toolkit";
const initialStateValue = false;

export const editSlice = createSlice({
  name: "isEditMode",
  initialState: { value: initialStateValue },
  reducers: {
    setIsEditMode: (state) => {
      state.value = true;
    },
    setCloseEditMode: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const {setIsEditMode, setCloseEditMode} =editSlice.actions;
export default editSlice.reducer;