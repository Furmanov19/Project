import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
      width:"10%"
  },
  root:{
      width:50,
      margin:"200px auto"
  }
});

function Load(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <CircularProgress className={classes.progress} />
    </div>
  );
}

Load.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Load);