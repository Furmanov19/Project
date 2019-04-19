import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {CommentsLink} from "./../../common/Links";
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "75%",
    margin: "10px auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center"
  },
  companyInfo: {
    width: "30%"
  },
  services: {
    width: "50%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  booking: {
    width: "20%",
    padding: " 0 auto"
  },
  chip: {
    margin: "1%"
  },
  buttonsBlock: {
    display: "flex",
    flexDirection: "column"
  },
  button: {
    margin: theme.spacing.unit
  }
});

class ExecutorCard extends React.Component {
  constructor(props) {
    super(props);
    this.isChip = this.isChip.bind(this);
  }
  isChip(services) {
    if (
      services.smallRoom !== null ||
      services.largeRoom !== null ||
      services.toilet !== null
    )
      return true;
  }
  render() {
    const { classes, services } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <div className={classes.companyInfo}>
            <Typography variant="h4">{this.props.name}</Typography>
            <Typography>average price:{this.props.averagePrice}$</Typography>
            <Typography>average rate:{this.props.averageRate}</Typography>
          </div>
          <div className={classes.services} variant="outlined">
            {this.isChip(services.standart) && (
              <Chip key="standart" label="standart" className={classes.chip} />
            )}
            {this.isChip(services.general) && (
              <Chip key="general" label="general" className={classes.chip} />
            )}
            {this.isChip(services.afterRepair) && (
              <Chip
                key="afterRepair"
                label="after repair"
                className={classes.chip}
              />
            )}
            {this.isChip(services.carpetDryCleaning) && (
              <Chip
                key="carpetDryCleaning"
                label="carpet dry cleaning"
                className={classes.chip}
              />
            )}
            {this.isChip(services.office) && (
              <Chip key="office" label="office" className={classes.chip} />
            )}
            {this.isChip(services.industrialСleaning) && (
              <Chip
                key="industrialСleaning"
                label="industrial cleaning"
                className={classes.chip}
              />
            )}
            {this.isChip(services.furniture) && (
              <Chip
                key="furniture"
                label="furniture"
                className={classes.chip}
              />
            )}
            {this.isChip(services.pool) && (
              <Chip key="pool" label="pool" className={classes.chip} />
            )}
          </div>
          <div className={classes.buttonsBlock}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => {
                console.log("click");
                this.props.selectExecutorForInfo(this.props.executorInfo);
              }}
            >
              Booking
            </Button>
            <Button
              component={CommentsLink}
              variant="outlined"
              color="secondary"
              className={classes.button}
              onClick={() => {
                console.log("click");
                this.props.selectExecutorForInfo(this.props.executorInfo);
              }}
            >
              View comments
            </Button>
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
