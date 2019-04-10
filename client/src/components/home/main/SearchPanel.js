import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import SearchSelect from './SearchSelect';
import { searchInputChange } from '../../../actions/searchActions';
import { getExecutors } from '../../../actions/executorsActions';

const styles = theme => ({
  root: {
    width: '75%',
    margin:'20px auto 10px'
  },
  appBar:{
    borderRadius: theme.shape.borderRadius
  },
  toolBar:{
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between"
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

function SearchPanel(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolBar}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              name="searchValue"
              onChange={(e)=>{props.searchInputChange(e.target.value);props.getExecutors()}}
            />
          </div>
          
          {/* <SearchSelect handlePriceChange={props.handlePriceChange}/> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

SearchPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  total:state.executors.executors.total,
  limit:state.executors.executors.limit,
  offset:state.search.page
});

export default connect(
  mapStateToProps,
  {searchInputChange,getExecutors}
)(withStyles(styles)(SearchPanel));