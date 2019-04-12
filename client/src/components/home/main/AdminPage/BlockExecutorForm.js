import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const styles = theme => ({
  root: {
    width: '100%',
    margin:"0 auto",
    marginBottom:"-20px",
    maxWidth: '360px',
    backgroundColor: theme.palette.background.paper,
  },
  paper:{
    width: '50%',
    margin:"10% auto",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width:"94%",
  },
  button: {
    margin: theme.spacing.unit,
  },
  block:{
    width:"77%",
    margin:"0 auto"
  }
});



class BlockForm extends Component  {
  constructor(props){
    super(props);
    this.state={
      reason:""
    }
    this.handleChange=this.handleChange.bind(this);
  }
  handleChange(e){
    this.setState({[e.target.name]:e.target.value});
  }
  render(){
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <List className={classes.root}>
          <ListItem >
            <ListItemText primary="Id" />
            <Typography>
              {this.props.selectedExecutor._id}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <ListItemText primary="Name" />
            <Typography>
              {this.props.selectedExecutor.name}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <ListItemText primary="Role" />
            <Typography>
              {this.props.selectedExecutor.role}
            </Typography>
          </ListItem>
        </List>
        <div className={classes.block}>
          <TextField
            id="standard-multiline-flexible"
            name="reason"
            label="Write a block reason"
            multiline
            rowsMax="4"
            className={classes.textField}
            onChange={this.handleChange}
            margin="normal"
          />
          <Button variant="contained" color="secondary" className={classes.button} onClick={()=>{this.props.blockExecutor(this.props.selectedExecutor._id,this.state.reason)}}>
            BLOCK
          </Button>
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles)(BlockForm);