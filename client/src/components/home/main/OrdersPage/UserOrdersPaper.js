import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "75%",
    margin: "10px auto",
    display:"flex",
    flexWrap:"wrap",
    justifyContent:"space-between",
    alignItems:"center"
  },
  companyInfo:{
    width:"30%"
  },
  services:{
    width:"50%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  booking:{
    width:"20%",
    padding:" 0 auto"
  },
  chip: {
    margin: "1%"
  },
});

class ExecutorCard extends React.Component {
  render() {
    const { classes,order} = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography>
              {order.type}
          </Typography>
        </Paper>
      </div>
    );
  }
}

ExecutorCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExecutorCard);
