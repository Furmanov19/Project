import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Formik } from "formik";
import { string, object } from "yup";
import InputMask from 'react-input-mask';
import ConfirmFormContainer from '../../../containers/UserConfirmFormContainer';
const Input = (props) => (
  <InputMask mask="+3\75 \(99\) 999 99 99" maskChar=" " disabled={props.disabled} name={props.name} className={props.className} value={props.value} onChange={props.onChange} helperText={props.helperText} error={props.error}>
    {(inputProps) => <TextField {...inputProps} type="tel" variant="outlined" label="Phone number"  autoComplete="phone"/>}
  </InputMask>
);

const validationSchema = object().shape({
  name: string()
    .required("Username is required")
    .min(2, "Username must contain atleast 2 characters")
    .max(9, "Username must contain less then 9 characters")
    .matches(
      /^[a-zA-Z][a-zA-Z0-9-_.]{1,9}$/,
      "The username can contain letters, numbers, -, ., _"
    ),
  password: string()
    .required("Enter your password")
    .min(5, "Password must contain atleast 5 characters")
    .max(18, "Password must contain less then 18 characters")
    .matches(/^[\S]{5,18}$/, "The password cannot contain spaces"),
  email: string()
    .required("Email is require")
    .matches(/.+@.+\..+/i,"Incorrect email!"),
});

const styles = theme => ({
  container: {
    position:'relative',
    display: 'flex',
    flexWrap:'wrap',
    flexDirection:'column',
    width:'50%',
    margin:'16px auto',
    justifyContent:'center',
    alignItems:'center'
  },
  textField: {
      width:'85%',
      margin:"5px"
  },
  confirmContainer:{
    position:'absolute',
    zIndex:'1',
    width:'50%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    padding:'2%'
  }

});


class UserRegistrationForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          disabled:false,
          isSended:false
        };
       
    }
  render() {
    return (
      <Formik
          initialValues={{ name: "", email:"", phone:"", password: ""}}
          validationSchema={validationSchema}
          onSubmit={(values, { setFieldError }) => {
              try{
                this.setState({disabled:true,isSended:true});
                const newUser={
                  name:values.name,
                  email:values.email,
                  phone:values.phone,
                  password:values.password
                }
                this.props.registerUser(newUser);
              } catch (errors) {
                errors.forEach(err => {
                  setFieldError(err.field, err.error);
                });
              }
            }
          }
        component={this.form}
      />
    );
  }
 form =({ handleSubmit, handleChange, values, errors }) => {
  const { classes } = this.props;
  return (
    <form className={classes.container} onSubmit={handleSubmit} noValidate>
      <TextField
            label="Name"
            autoComplete="name"
            className={classes.textField}
            disabled = {(this.state.disabled)? true : false}
            margin="normal"
            variant="outlined"
            name="name"
            onChange={handleChange}
            value={values.name}
            helperText={errors.name}
            error={Boolean(errors.name)}
      />
      <TextField
            label="Email"
            autoComplete="email"
            className={classes.textField}
            disabled = {(this.state.disabled)? true : false}
            margin="normal"
            variant="outlined"
            name="email"
            onChange={handleChange}
            value={values.email}
            helperText={errors.email}
            error={Boolean(errors.email)}
      />
      <Input
            className={classes.textField}
            disabled = {(this.state.disabled)? true : false}
            name="phone"
            onChange={handleChange}
            value={values.phone}
            helperText={errors.phone}
            error={Boolean(errors.phone)}
      />
      <TextField
            label="Password"
            autoComplete="password"
            className={classes.textField}
            disabled = {(this.state.disabled)? true : false}
            margin="normal"
            variant="outlined"
            name="password"
            onChange={handleChange}
            value={values.password}
            helperText={errors.password}
            error={Boolean(errors.password)}
      />
      {this.state.isSended && (
        <ConfirmFormContainer 
          containerStyle={classes.confirmContainer}
          textFieldStyle={classes.textField}
          btnStyle={classes.button}
          userEmail={values.email}
        />
      )}
      {!this.state.isSended && (
        <Button
            type="submit"
            key="submit"
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
          >
          REGISTER
        </Button>
      )}
      
    </form>
  );
 }
}

UserRegistrationForm.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
};

export default withStyles(styles)(UserRegistrationForm);