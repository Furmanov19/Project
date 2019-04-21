import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

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
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.order.status,
      reason: this.props.order.rejectionReason
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
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
          <Divider className={classes.divider} variant="inset" />
          <div className={classes.element}>
            <Button
              type="submit"
              key="submit"
              variant="contained"
              color="secondary"
              size="small"
              className={classes.button}
              onClick={() => {
                this.props.changeOrderStatus(
                  order._id,
                  this.state.status,
                  this.state.reason
                );
                this.props.getExecutorOrders();
              }}
            >
              Change status
            </Button>
            <Select
              className={classes.select}
              value={this.state.status}
              onChange={this.handleChange}
              inputProps={{
                name: "status",
                id: "status"
              }}
            >
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="accepted">Accepted</MenuItem>
              <MenuItem value="regected">Regected</MenuItem>
            </Select>
          </div>
          {this.state.status === "regected" && (
            <TextField
              name="reason"
              onChange={this.handleChange}
              label="Rejection reason"
              multiline
              rowsMax="4"
              margin="normal"
              variant="outlined"
            />
          )}
        </Paper>
      </div>
    );
  }
}

ExecutorCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExecutorCard);
