import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { priceSelectChange } from '../../../actions/searchActions';
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

class PriceSelect extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
          <InputLabel className={classes.label} htmlFor="price">Price</InputLabel>
          <Select
            className={classes.select}
            value={this.props.price}
            onChange={(e)=>{this.props.priceSelectChange(e.target.value);this.props.getExecutors()}}
            inputProps={{
              name: 'price',
              id: 'price',
            }}
          >
            <MenuItem value="" >
              <em>None</em>
            </MenuItem>
            <MenuItem value={1} >Cheap</MenuItem>
            <MenuItem value={-1} >Coast</MenuItem>
          </Select>
      </div>
    );
  }
}

PriceSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  price:state.search.price
});

export default connect(
  mapStateToProps,
  {priceSelectChange,getExecutors}
)(withStyles(styles)(PriceSelect));