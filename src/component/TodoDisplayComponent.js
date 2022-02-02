import React,{useState,useEffect} from "react";
import {
  Chip,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles({
  todoItems: {
    padding: "15px",
  },
});

export default function TodoDisplayComponent({
  todos,
  handleDelete,
  handleEditClick,
  handleNext,
}) {
  const classes = useStyles();
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [done,setDone]=useState(false)

  const handleDone = () => {
    if(done==false){
      setBackgroundColor("#0FBD86");
      setDone(true);
    }else{
      setBackgroundColor("#FFFFFF");
      setDone(false)
    }
  };


  return (
    <Grid
      container
      direction="column"
      spacing={2}
      
    >
      {todos.map((todo) => {
        return (
          <Grid item key={todo.id} >
            <Paper className={classes.todoItems} elevation={3} style={{ backgroundColor: `${backgroundColor}` }}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6">{todo.val}</Typography>
                </Grid>
                <Grid>
                  <Chip
                    color="primary"
                    label={todo.priority}
                    size="small"
                    clickable
                  />
                </Grid>
              </Grid>
              <Typography variant="body2">{todo.due}</Typography>

              <div>
                <IconButton
                  color="primary"
                  onClick={() => {
                    handleDelete(todo.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={() => {
                    handleEditClick(todo);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton color="primary" onClick={handleDone}>
                  <DoneIcon />
                </IconButton>
                <IconButton color="primary" onClick={() => handleNext(todo)}>
                  <NavigateNextIcon />
                </IconButton>
              </div>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}
