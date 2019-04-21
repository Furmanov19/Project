import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import { searchInputChange } from "../../../../actions/searchActions";
import { getUsers } from "../../../../actions/usersActions";

const styles = theme => ({
  root: {
    width: "75%",
    margin: "20px auto 10px"
  },
  appBar: {
    borderRadius: theme.shape.borderRadius
  },
  total: {
    fontSize: 18,
    color: "white"
  },
  toolBar: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around"
  },
  search: {
    position: "relative",
    margin: 5,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
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
                input: classes.inputInput
              }}
              name="searchValue"
              onChange={e => {
                props.searchInputChange(e.target.value);
                props.getUsers();
              }}
            />
          </div>
          <Typography component="p" className={classes.total}>
            Total :{props.total}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SearchPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  total: state.users.users.total,
  limit: state.users.users.limit,
  offset: state.search.page
});

export default connect(
  mapStateToProps,
  { searchInputChange, getUsers }
)(withStyles(styles)(SearchPanel));
