import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    color:'inherit'
  },
  btn:{
    color:'white',
    fontSize:"16px",
    textDecoration:"none"
  },
  toolbar:{
    width:'75%',
    margin:"0 auto"
  },
  logo:{
    color:'white',
    fontSize:"30px",
    textDecoration:"none"
  }
};
const RegLink = props => <Link to="/register" {...props} />
const LogLink = props => <Link to="/login" {...props} />
const Logo = props => <Link to="/" {...props} />

function Header(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h4" color="inherit" className={classes.grow}>
            <Logo className={classes.logo}>
              MY APP
            </Logo>
          </Typography>
          <Typography>
            <Button component={LogLink} className={classes.btn} size="large">
              LOG IN
            </Button>
            <Button component={RegLink} className={classes.btn} size="large">
              REGISTRATION
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Header);
