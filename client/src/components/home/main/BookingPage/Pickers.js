import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  grid: {
    width: '100%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class Pickers extends React.Component {
  state = {
    // The first commit of Material-UI
    selectedDate: new Date('2014-08-18T21:11:54'),
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { classes } = this.props;

    return (
        <Grid container className={classes.grid} justify="space-around">
        <TextField
        id="date"
        label="Day"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e)=>{this.props.handleDateChange(e)}}
      />
      <TextField
        id="time"
        label="clock"
        type="time"
        defaultValue="07:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        onChange={(e)=>{this.props.handleTimeChange(e)}}
      />
        </Grid>
    );
  }
}

Pickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pickers);