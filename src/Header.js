import { Grid, IconButton, Typography } from "@material-ui/core";
import React from "react";
import Fab from "@material-ui/core/Fab";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
// import { bindActionCreators } from "redux";
// import { useDispatch } from "react-redux";
// import { actionCreators } from "./store/index";

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
  // const dispatch = useDispatch();
  // const { setOPenDialog } = bindActionCreators(actionCreators, dispatch);

  return (
    <>
      <Grid container justifyContent="space-between" className={classes.main}>
        <Grid item>
          <Typography variant="h4">TODO</Typography>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          className={classes.today}
        >
          <Grid item className={classes.todayEle}>
            <IconButton
              color="primary"
              onClick={() => {
                handleTodoNextDay("prev");
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </Grid>
          <Grid item className={classes.todayEle}>
            <Typography variant="h4">
              {currentDate == getCurrentDate() ? "Today" : currentDate}
            </Typography>
          </Grid>
          <Grid item className={classes.todayEle}>
            <IconButton
              color="primary"
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
