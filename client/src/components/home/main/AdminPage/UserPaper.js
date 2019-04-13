import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { UserBlockLink } from '../../../common/Links';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width:"75%",
    margin:"10px auto",
    position:'relative'
  },
  button:{
    position:'absolute',
    right:'5%',
    top:'25%'
  }
});

function UsersPaper(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          {props.userInfo.name}
        </Typography>
        <Typography component="p">
          {props.userInfo.role}
        </Typography>
        <Button variant="outlined" color="primary" className={classes.button} component={UserBlockLink} onClick={() =>{props.SelectUser(props.userInfo)}}>
            Blocking
        </Button>
      </Paper>
    </div>
  );
}

UsersPaper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersPaper);