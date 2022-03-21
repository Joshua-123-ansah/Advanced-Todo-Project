import React, { useState, useEffect, useRef } from "react";
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
  const [clicked, setClicked] = useState([]);

  const handleDone = (todoID) => {
    if (!clicked.includes(todoID)) setClicked([...clicked, todoID]);
    else {
      setClicked(clicked.filter((id) => todoID != id));
    }
  };

  return (
    <Grid container direction="column" spacing={2}>
      {todos.map((todo) => {
        return (
          <Grid item key={todo.id} component="div">
            <Paper
              className={classes.todoItems}
              data-testid="todoid"
              elevation={3}
              style={{
                backgroundColor: `${
                  clicked.includes(todo.id) ? "Green" : "white"
                }`,
              }}
            >
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
                  <DeleteIcon title="deleteIcon" />
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={() => {
                    handleEditClick(todo);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={() => {
                    handleDone(todo.id);
                  }}
                >
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
