import {createSlice} from "@reduxjs/toolkit";
const initialStateValue=[];

export var mainTodosSlice=createSlice({
    name:"mainTodos",
    initialState:{value:initialStateValue},
    reducers:{
        setMainTodos:(state,action) => {
            state.value=action.payload;
        }
    }
})

export const {setMainTodos}=mainTodosSlice.actions;
export default mainTodosSlice.reducer;