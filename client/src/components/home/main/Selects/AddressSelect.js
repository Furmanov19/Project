import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { addressSelectChange } from '../../../../actions/searchActions';
import { getExecutors } from '../../../../actions/executorsActions';

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

class AddressSelect extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
          <InputLabel className={classes.label} htmlFor="address">Address</InputLabel>
          <Select
            className={classes.select}
            value={this.props.address}
            onChange={(e)=>{this.props.addressSelectChange(e.target.value);this.props.getExecutors()}}
            inputProps={{
              name: 'address',
              id: 'address',
            }}
          >
            <MenuItem value="" >
              <em>None</em>
            </MenuItem>
            <MenuItem value={"mogilev"} >Mogilev</MenuItem>
            <MenuItem value={"minsk"} >Minsk</MenuItem>
            <MenuItem value={"grodno"} >Grodno</MenuItem>
            <MenuItem value={"brest"} >Brest</MenuItem>
            <MenuItem value={"vitebsk"} >Vitebsk</MenuItem>
            <MenuItem value={"gomel"} >Gomel</MenuItem>
          </Select>
      </div>
    );
  }
}

AddressSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  address:state.search.address
});

export default connect(
  mapStateToProps,
  {addressSelectChange,getExecutors}
)(withStyles(styles)(AddressSelect));