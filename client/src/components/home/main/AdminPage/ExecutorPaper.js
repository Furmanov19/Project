import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ExecutorBlockLink } from "../../../common/Links";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "75%",
    margin: "10px auto",
    position: "relative"
  },
  button: {
    position: "absolute",
    right: "5%",
    top: "25%"
  }
});

function ExecutorPaper(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          {props.executorInfo.name}
        </Typography>
        <Typography component="p">{props.executorInfo.role}</Typography>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          component={ExecutorBlockLink}
          onClick={() => {
            props.SelectExecutor(props.executorInfo);
          }}
        >
          Blocking
        </Button>
      </Paper>
    </div>
  );
}

ExecutorPaper.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExecutorPaper);
