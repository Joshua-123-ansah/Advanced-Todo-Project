import {createSlice} from "@reduxjs/toolkit";
const initialStateValue=[];

export const todosSlice=createSlice({
    name:"todos",
    initialState:{value:initialStateValue},
    reducers:{
        setTodos:(state,action) => {
            state.value=action.payload;
        }
    }
})

export const {setTodos}=todosSlice.actions;
export default todosSlice.reducer;