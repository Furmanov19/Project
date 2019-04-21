import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column",
    margin: 5
  },
  element: {
    width: "100%",
    display: "flex",
    alignItems: "center"
  },
  content: {
    display: "inline",
    marginRight: theme.spacing.unit * 2
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  select: {
    marginTop: theme.spacing.unit * 2
  }
});

class ExecutorCard extends React.Component {
  render() {
    const date = new Date();
    const { classes, order } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <div className={classes.element}>
            <Typography className={classes.content} variant="subtitle1">
              Email:
            </Typography>
            <Typography variant="caption">{order.email}</Typography>
          </div>
          <div className={classes.element}>
            <Typography className={classes.content} variant="subtitle1">
              City:
            </Typography>
            <Typography variant="caption">{order.city}</Typography>
          </div>
          <div className={classes.element}>
            <Typography className={classes.content} variant="subtitle1">
              Address:
            </Typography>
            <Typography variant="caption">{order.address}</Typography>
          </div>
          <div className={classes.element}>
            <Typography className={classes.content} variant="subtitle1">
              Type:
            </Typography>
            <Typography variant="caption">{order.type}</Typography>
          </div>
          <div className={classes.element}>
            <Typography className={classes.content} variant="subtitle1">
              Date:
            </Typography>
            <Typography variant="caption">
              {date.getFullYear(order.date) +
                "-" +
                date.getMonth(order.date) +
                "-" +
                date.getDay(order.date)}
            </Typography>
          </div>
          <div className={classes.element}>
            <Typography className={classes.content} variant="subtitle1">
              Time:
            </Typography>
            <Typography variant="caption">{order.time}</Typography>
          </div>
          <div className={classes.element}>
            <Typography className={classes.content} variant="subtitle1">
              Regulatiry:
            </Typography>
            <Typography variant="caption">{order.regularity}</Typography>
          </div>
          <div className={classes.element}>
            <Typography className={classes.content} variant="subtitle1">
              Duration:
            </Typography>
            <Typography variant="caption">{order.duration}</Typography>
          </div>
          <div className={classes.element}>
            <Typography className={classes.content} variant="subtitle1">
              Price:
            </Typography>
            <Typography variant="caption">{order.price} $</Typography>
          </div>
          <div className={classes.element}>
            <Typography className={classes.content} variant="subtitle1">
              Status:
            </Typography>
            <Typography variant="subtitle1">{order.status}</Typography>
          </div>
        </Paper>
      </div>
    );
  }
}

ExecutorCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExecutorCard);
