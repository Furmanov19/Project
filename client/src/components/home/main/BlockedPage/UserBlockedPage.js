import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "50%",
    margin: "100px auto",
    textAlign: "center"
  }
});

function UserBlockedPage(props) {
  const { classes } = props;
  return (
    <>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h4" component="h3">
          You was blocked :(
        </Typography>
        <Typography variant="h5" component="h3">
          Your username: {props.user.name}
        </Typography>
        <Typography variant="h5" component="h3">
          Blocking reason: {props.user.reason}
        </Typography>
      </Paper>
    </>
  );
}

export default withStyles(styles)(UserBlockedPage);
