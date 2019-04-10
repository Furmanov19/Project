import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
      width:"30%",
  },
  label:{
      marginRight:5,
      color:"white"
  },
  select:{
      color:"white",
      textAlign:"center"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SearchSelect extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
          <InputLabel className={classes.label} htmlFor="price">Price</InputLabel>
          <Select
            className={classes.select}
            value={this.state.price}
            onChange={(e)=>this.props.handlePriceChange(e)}
            inputProps={{
              name: 'price',
              id: 'price',
            }}
          >
            <MenuItem value="" >
              <em>None</em>
            </MenuItem>
            <MenuItem value={10} >Cheap</MenuItem>
            <MenuItem value={-10} >Coast</MenuItem>
          </Select>
      </div>
    );
  }
}

SearchSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchSelect);