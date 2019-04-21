import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Formik } from "formik";
import { string, object } from "yup";
import InputMask from 'react-input-mask';

const Input = (props) => (
  <InputMask mask="+3\75 \(99\) 999 99 99" maskChar=" " disabled={props.disabled} name={props.name} className={props.className} value={props.value} onChange={props.onChange} helperText={props.helperText} error={props.error}>
    {(inputProps) => <TextField {...inputProps} type="tel" variant="outlined" label="Phone number"  autoComplete="phone"/>}
  </InputMask>
);

const validationSchema = object().shape({
  name: string()
    .min(2, "Username must contain atleast 2 characters")
    .max(9, "Username must contain less then 9 characters")
    .matches(
      /^[a-zA-Z][a-zA-Z0-9-_.]{1,9}$/,
      "The username can contain letters, numbers, -, ., _"
    ),
  password: string()
    .min(5, "Password must contain atleast 5 characters")
    .max(18, "Password must contain less then 18 characters")
    .matches(/^[\S]{5,18}$/, "The password cannot contain spaces"),
  confirmPassword: string()
    .test("password-match","Passport should match",function(value){
      return this.parent.password === value;
    })
});

const styles = theme => ({
  container: {
    marginTop:theme.spacing.unit * 2,
    marginLeft:'auto',
    marginRight:'auto',
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


class UserEditProfile extends React.Component {
  constructor(props){
      super(props);
      this.state = {
      };
  }
  render() {
    return (
      <Formik
          initialValues={{ name: this.props.name,  phone:this.props.phone, password: "",confirmPassword:""}}
          validationSchema={validationSchema}
          onSubmit={(values, { setFieldError }) => {
              try{
                const newUser={
                  name:values.name,
                  phone:values.phone,
                  password:values.password
                }
                console.log(newUser);
                this.props.editUser(newUser);
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
            type={'password'}
      />
      <TextField
            label="Confirm Password"
            className={classes.textField}
            disabled = {(this.state.disabled)? true : false}
            margin="normal"
            variant="outlined"
            name="confirmPassword"
            onChange={handleChange}
            value={values.confirmPassword}
            helperText={errors.confirmPassword}
            error={Boolean(errors.confirmPassword)}
            type={'password'}
      />
        <Button
            type="submit"
            key="submit"
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
          >
          CONFIRM
        </Button>
    </form>
  );
 }
}

UserEditProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserEditProfile);