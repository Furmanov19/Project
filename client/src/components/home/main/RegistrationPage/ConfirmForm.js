import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



export default class ConfirmForm extends Component {
    constructor(props){
        super(props);
        this.state={
            code:""
        }
        this.handleClick=this.handleClick.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    handleClick(){
      console.log("click")
        const userInfo={
            code:this.state.code.trim(),
            email:this.props.userEmail
        }
        this.props.registerConfirmUser(userInfo);
    }
    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
  render() {
    return (
      <Paper className={this.props.containerStyle}>
            <TextField
              label="Code"
              className={this.props.textFieldStyle}
              margin="normal"
              variant="outlined"
              name="code"
              onChange={this.handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              size="medium"
              className={this.propsbtnFieldStyle}
              onClick={this.handleClick}
            >CONFIRM</Button>
        </Paper>
    )
  }
}
