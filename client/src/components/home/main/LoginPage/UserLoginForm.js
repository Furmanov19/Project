import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Formik } from "formik";
import { string, object } from "yup";

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
    .matches(/^[\S]{5,18}$/, "The password cannot contain spaces")
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
          initialValues={{ name: "", password: ""}}
          validationSchema={validationSchema}
          onSubmit={(values, { setFieldError }) => {
            let user ={
              name:values.name,
              password:values.password
            }
              this.props.loginUser(user);
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
        <Button
            type="submit"
            key="submit"
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
          >
          LOG IN
        </Button>
      
    </form>
  );
 }
}

// UserRegistrationForm.propTypes = {
//   classes: PropTypes.object.isRequired,
//   error: PropTypes.object.isRequired,
//   register: PropTypes.func.isRequired,
// };

export default withStyles(styles)(UserRegistrationForm);