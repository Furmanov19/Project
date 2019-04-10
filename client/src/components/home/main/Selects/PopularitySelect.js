import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { popularitySelectChange } from '../../../../actions/searchActions';
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

class PopularitySelect extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
          <InputLabel className={classes.label} htmlFor="price">Popularity</InputLabel>
          <Select
            className={classes.select}
            value={this.props.popularity}
            onChange={(e)=>{this.props.popularitySelectChange(e.target.value);this.props.getExecutors()}}
            inputProps={{
              name: 'popularity',
              id: 'popularity',
            }}
          >
            <MenuItem value="" >
              <em>None</em>
            </MenuItem>
            <MenuItem value={-1} >High</MenuItem>
            <MenuItem value={1} >Low</MenuItem>
          </Select>
      </div>
    );
  }
}

PopularitySelect.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    popularity:state.search.popularity
});

export default connect(
  mapStateToProps,
  {popularitySelectChange,getExecutors}
)(withStyles(styles)(PopularitySelect));