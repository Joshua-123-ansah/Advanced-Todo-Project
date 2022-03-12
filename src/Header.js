import { Grid, IconButton, Typography } from "@material-ui/core";
import React from "react";
import Fab from "@material-ui/core/Fab";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";


const useStyles = makeStyles({
  main: {
    // backgroundColor: "red",
    padding: "10px",
    marginBottom: "20px",
  },
  today: {
    width: "300px",
  },
  todayEle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().slice(0, 10);
};

export default function Header({
  handleDialogOpen,
  handleTodoNextDay,
  currentDate,
}) {
  const classes = useStyles();

  return (
    <>
      <Grid container justifyContent="space-between" className={classes.main}>
        <Grid item>
          <Typography variant="h4" data-testid="todo">
            TODO
          </Typography>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          className={classes.today}
        >
          <Grid item className={classes.todayEle}>
            <IconButton
              color="primary"
              data-testid="backward-button"
              onClick={() => {
                handleTodoNextDay("prev");
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </Grid>
          <Grid item className={classes.todayEle}>
            <Typography variant="h4" data-testid="date">
              {currentDate == getCurrentDate() ? "Today" : currentDate}
            </Typography>
          </Grid>
          <Grid item className={classes.todayEle}>
            <IconButton
              color="primary"
              data-testid="forward-button"
              onClick={() => {
                handleTodoNextDay("next");
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <Fab
            color="primary"
            data-testid="fab-button"
            arial-label="add"
            onClick={() => {
              handleDialogOpen();
            }}
          >
            <Add />
          </Fab>
        </Grid>
      </Grid>
    </>
  );
}
