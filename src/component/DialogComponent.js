import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
}));

const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().slice(0, 10);
};

export default function DialogComponent({
  // open,
  handleDialogClose,
  handleSubmit,
  editTodo,
  isEditMode,
}) {
  const classes = useStyles();
  //These are local state hence there is no need to add it to redux.
  const [todoText, setTodoText] = useState("");
  const [priority, setPriority] = useState("Low");
  const [date, setDate] = useState(getCurrentDate());


  useEffect(() => {
    if (isEditMode) {

      setTodoText(editTodo.val);
      setPriority(editTodo.priority);
      setDate(editTodo.due);
    } else {

      setTodoText("");
      setPriority("Low");
      setDate(getCurrentDate());
    }
  }, [isEditMode]);

  const formSubmit = () => {
    let newTodo = {
      val: todoText,
      priority: priority,
      dueDate: date,
    };



    handleSubmit(newTodo);
    handleDialogClose();
    setTodoText("");
    setPriority("Low");
    setDate(getCurrentDate());
  };
  
  //Setting open tp false from the redux store 
  const open=useSelector((state) =>state.dialog.value);


  return (
    <Dialog open={open} onClose={handleDialogClose}>
      <DialogTitle>{isEditMode ? "Update" : "Add Todo"}</DialogTitle>
      <DialogContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              label="Todo Text....."
              variant="outlined"
              name="todoText"
              onChange={(e) => setTodoText(e.target.value)}
              value={todoText}
              className={classes.formControl}
            />
          </Grid>
          <Grid item>
            <FormControl className={classes.formControl} variant="filled">
              <InputLabel id="priority">Priority</InputLabel>
              <Select
                name="priorityType"
                onChange={(e) => setPriority(e.target.value)}
                value={priority}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Med">Med</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              id="date"
              label="Due Date"
              className={classes.formControl}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              name="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button color="primary" onClick={formSubmit}>
          {isEditMode ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
