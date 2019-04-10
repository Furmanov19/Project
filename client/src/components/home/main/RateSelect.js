import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { rateSelectChange } from '../../../actions/searchActions';
import { getExecutors } from '../../../actions/executorsActions';

const styles = theme => ({
  root: {
      width:"auto",
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

class RateSelect extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
          <InputLabel className={classes.label} htmlFor="price">Rate</InputLabel>
          <Select
            className={classes.select}
            value={this.props.rate}
            onChange={(e)=>{this.props.rateSelectChange(e.target.value);this.props.getExecutors()}}
            inputProps={{
              name: 'rate',
              id: 'rate',
            }}
          >
            <MenuItem value="" >
              <em>None</em>
            </MenuItem>
            <MenuItem value={1} >1</MenuItem>
            <MenuItem value={2} >2</MenuItem>
            <MenuItem value={3} >3</MenuItem>
            <MenuItem value={4} >4</MenuItem>
            <MenuItem value={5} >5</MenuItem>
          </Select>
      </div>
    );
  }
}

RateSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  rate:state.search.rate
});

export default connect(
  mapStateToProps,
  {rateSelectChange,getExecutors}
)(withStyles(styles)(RateSelect));