import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { Formik } from "formik";
import { string, object } from "yup";
import InputMask from "react-input-mask";
import ExecutorServices from "../RegistrationPage/ExecutorServices";

const Input = props => (
  <InputMask
    mask="+3\75 \(99\) 999 99 99"
    maskChar=" "
    disabled={props.disabled}
    name={props.name}
    className={props.className}
    value={props.value}
    onChange={props.onChange}
    helperText={props.helperText}
    error={props.error}
  >
    {inputProps => (
      <TextField
        {...inputProps}
        type="tel"
        variant="outlined"
        label="Phone number"
        autoComplete="phone"
      />
    )}
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
  address: string(),
  password: string()
    .min(5, "Password must contain atleast 5 characters")
    .max(18, "Password must contain less then 18 characters")
    .matches(/^[\S]{5,18}$/, "The password cannot contain spaces"),
  confirmPassword: string().test(
    "password-match",
    "Passport should match",
    function(value) {
      return this.parent.password === value;
    }
  ),
  discription: string()
});

const styles = theme => ({
  root: {
    width: "70%",
    marginTop:theme.spacing.unit * 2,
    marginLeft:'auto',
    marginRight:'auto',
  },
  header: {
    margin: "3% auto 0%",
    textAlign: "center"
  },
  divider: {
    width: "90%",
    margin: "0 auto"
  },
  container: {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    width: "100%",
    margin: "16px auto",
    justifyContent: "center",
    alignItems: "center"
  },
  textField: {
    width: "85%",
    margin: "5px"
  }
});

class ExecutorEditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: {
        standart: {
          smallRoom: this.props.services.standart.smallRoom,
          largeRoom: this.props.services.standart.largeRoom,
          toilet: this.props.services.standart.toilet
        },
        general: {
          smallRoom: this.props.services.general.smallRoom,
          largeRoom: this.props.services.general.largeRoom,
          toilet: this.props.services.general.toilet
        },
        afterRepair: {
          smallRoom: this.props.services.afterRepair.smallRoom,
          largeRoom: this.props.services.afterRepair.largeRoom,
          toilet: this.props.services.afterRepair.toilet
        },
        carpetDryCleaning: {
          smallRoom: this.props.services.carpetDryCleaning.smallRoom,
          largeRoom: this.props.services.carpetDryCleaning.largeRoom,
          toilet: this.props.services.carpetDryCleaning.toilet
        },
        office: {
          smallRoom: this.props.services.office.smallRoom,
          largeRoom: this.props.services.office.largeRoom,
          toilet: this.props.services.office.toilet
        },
        industrialСleaning: {
          smallRoom: this.props.services.industrialСleaning.smallRoom,
          largeRoom: this.props.services.industrialСleaning.largeRoom,
          toilet: this.props.services.industrialСleaning.toilet
        },
        furniture: {
          smallRoom: this.props.services.furniture.smallRoom,
          largeRoom: this.props.services.furniture.largeRoom,
          toilet: this.props.services.furniture.toilet
        },
        pool: {
          smallRoom: this.props.services.pool.smallRoom,
          largeRoom: this.props.services.pool.largeRoom,
          toilet: this.props.services.pool.toilet
        }
      }
    };
    this.handleChangeService = this.handleChangeService.bind(this);
  }

  handleChangeService(e, service) {
    this.setState({
      ...this.state,
      services: {
        ...this.state.services,
        [service]: {
          ...this.state.services[service],
          [e.target.name]: e.target.value
        }
      }
    });
  }

  render() {
    return (
      <Formik
        initialValues={{
          name: this.props.executor.name,
          discription: this.props.executor.discription,
          password: "",
          confirmPassword: "",
          address: this.props.executor.address
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setFieldError }) => {
          try {
            const newExecutor = {
              name: values.name,
              email: values.email,
              discription: values.discription,
              password: values.password,
              services: this.state.services,
              address: values.address
            };
            console.log(newExecutor);
            this.props.editExecutor(newExecutor);
          } catch (errors) {
            errors.forEach(err => {
              setFieldError(err.field, err.error);
            });
          }
        }}
        component={this.form}
      />
    );
  }
  form = ({ handleSubmit, handleChange, values, errors }) => {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Typography className={classes.header} variant="h4">
          EDIT PROFILE
        </Typography>
        <Divider className={classes.divider} variant="inset" />
        <form className={classes.container} onSubmit={handleSubmit} noValidate>
          <TextField
            label="Company Name"
            autoComplete="name"
            className={classes.textField}
            disabled={this.state.disabled ? true : false}
            margin="normal"
            variant="outlined"
            name="name"
            onChange={handleChange}
            value={values.name}
            helperText={errors.name}
            error={Boolean(errors.name)}
          />
          <TextField
            label="Discription"
            multiline
            rowsMax="4"
            value={values.discription}
            onChange={handleChange}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            name="discription"
            helperText={errors.discription}
            error={Boolean(errors.discription)}
          />
          <TextField
            label="Adress"
            autoComplete="address"
            className={classes.textField}
            disabled={this.state.disabled ? true : false}
            margin="normal"
            variant="outlined"
            name="address"
            placeholder="Enter town"
            onChange={handleChange}
            value={values.address}
            helperText={errors.address}
            error={Boolean(errors.address)}
          />
          <TextField
            label="Password"
            autoComplete="password"
            className={classes.textField}
            disabled={this.state.disabled ? true : false}
            margin="normal"
            variant="outlined"
            name="password"
            onChange={handleChange}
            value={values.password}
            helperText={errors.password}
            error={Boolean(errors.password)}
            type={"password"}
          />
          <TextField
            label="Confirm Password"
            className={classes.textField}
            disabled={this.state.disabled ? true : false}
            margin="normal"
            variant="outlined"
            name="confirmPassword"
            onChange={handleChange}
            value={values.confirmPassword}
            helperText={errors.confirmPassword}
            error={Boolean(errors.confirmPassword)}
            type={"password"}
          />
          <ExecutorServices
            disabled={this.state.disabled ? true : false}
            serviceType={"standart"}
            smallRoom={this.state.services.standart.smallRoom}
            largeRoom={this.state.services.standart.largeRoom}
            toilet={this.state.services.standart.toilet}
            serviceName={"Standart Cleaning"}
            handleChangeService={this.handleChangeService}
          />
          <ExecutorServices
            disabled={this.state.disabled ? true : false}
            serviceType={"general"}
            smallRoom={this.state.services.general.smallRoom}
            largeRoom={this.state.services.general.largeRoom}
            toilet={this.state.services.general.toilet}
            serviceName={"General Cleaning"}
            handleChangeService={this.handleChangeService}
          />
          <ExecutorServices
            disabled={this.state.disabled ? true : false}
            serviceType={"afterRepair"}
            smallRoom={this.state.services.afterRepair.smallRoom}
            largeRoom={this.state.services.afterRepair.largeRoom}
            toilet={this.state.services.afterRepair.toilet}
            serviceName={"Cleaning after repair"}
            handleChangeService={this.handleChangeService}
          />
          <ExecutorServices
            disabled={this.state.disabled ? true : false}
            serviceType={"carpetDryCleaning"}
            smallRoom={this.state.services.carpetDryCleaning.smallRoom}
            largeRoom={this.state.services.carpetDryCleaning.largeRoom}
            toilet={this.state.services.carpetDryCleaning.toilet}
            serviceName={"Carpet Dry-Cleaning"}
            handleChangeService={this.handleChangeService}
          />
          <ExecutorServices
            disabled={this.state.disabled ? true : false}
            serviceType={"office"}
            smallRoom={this.state.services.office.smallRoom}
            largeRoom={this.state.services.office.largeRoom}
            toilet={this.state.services.office.toilet}
            serviceName={"Office Cleaning"}
            handleChangeService={this.handleChangeService}
          />
          <ExecutorServices
            disabled={this.state.disabled ? true : false}
            serviceType={"industrialСleaning"}
            smallRoom={this.state.services.industrialСleaning.smallRoom}
            largeRoom={this.state.services.industrialСleaning.largeRoom}
            toilet={this.state.services.industrialСleaning.toilet}
            serviceName={"Industrial Cleaning"}
            handleChangeService={this.handleChangeService}
          />
          <ExecutorServices
            disabled={this.state.disabled ? true : false}
            serviceType={"furniture"}
            smallRoom={this.state.services.furniture.smallRoom}
            largeRoom={this.state.services.furniture.largeRoom}
            toilet={this.state.services.furniture.toilet}
            serviceName={"Furniture Cleaning"}
            handleChangeService={this.handleChangeService}
          />
          <ExecutorServices
            disabled={this.state.disabled ? true : false}
            serviceType={"pool"}
            smallRoom={this.state.services.pool.smallRoom}
            largeRoom={this.state.services.pool.largeRoom}
            toilet={this.state.services.pool.toilet}
            serviceName={"Pool Cleaning"}
            handleChangeService={this.handleChangeService}
          />
          <Button
            type="submit"
            key="submit"
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
          >
            EDIT
          </Button>
        </form>
      </Paper>
    );
  };
}

ExecutorEditProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExecutorEditProfile);
