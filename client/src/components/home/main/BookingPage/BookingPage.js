import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Pickers from "./Pickers";
import Button from "@material-ui/core/Button";
import ConfirmPage from "./ConfirmPage";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "50%",
    margin: "10px auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center"
  },
  address: {
    textAlign: "center"
  },
  textField: {
    marginTop: 0,
    marginLeft: "10%"
  },
  header: {
    margin: "3% auto 0%",
    textAlign: "center"
  },
  divider: {
    width: "90%",
    margin: "0 auto"
  },
  select: {
    width: "30%",
    marginTop: "16px"
  },
  form: {
    width: "100%"
  },
  cleaningTypeSelect: {
    textAlign: "center",
    margin: "0 auto",
    width: "80%"
  }
});

class BookingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      email:this.props.user?this.props.user.email:"",
      exactAddress: "",
      cleaningType: "",
      date: "",
      time: "",
      smallRoomDisabled: false,
      largeRoomDisabled: false,
      toiletDisabled: false,
      smallRoomCount: 0,
      largeRoomCount: 0,
      toiletCount: 0,
      regularity: 1,
      duration: 1,
      price: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.isAvailable = this.isAvailable.bind(this);
    this.isDisabledRoom = this.isDisabledRoom.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleRoomCountChange = this.handleRoomCountChange.bind(this);
    this.handleChangeRegularity = this.handleChangeRegularity.bind(this);
    this.handleChangeDuration = this.handleChangeDuration.bind(this);
    this.calculatePrice = this.calculatePrice.bind(this);
    this.handleChangeEmail=this.handleChangeEmail.bind(this);
  }
  isAvailable(services) {
    if (
      services.smallRoom !== null ||
      services.largeRoom !== null ||
      services.toilet !== null
    )
      return true;
    else return false;
  }
  isDisabledRoom(roomType) {
    if ([this.state.cleaningType][roomType] !== null) return false;
    else return true;
  }
  handleChangeCity(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleChangeEmail(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(e.target.value);
    this.props.services[e.target.value].smallRoom
      ? this.setState({
          smallRoomDisabled: false
        })
      : this.setState({
          smallRoomDisabled: true
        });
    this.props.services[e.target.value].largeRoom
      ? this.setState({
          largeRoomDisabled: false
        })
      : this.setState({
          largeRoomDisabled: true
        });
    this.props.services[e.target.value].toilet
      ? this.setState({
          toiletDisabled: false
        })
      : this.setState({
          toiletDisabled: true
        });
    console.log(this.state);
  }
  handleTimeChange(e) {
    this.setState(
      {
        time: e.target.value
      },
      () => console.log(this.state)
    );
  }
  handleDateChange(e) {
    this.setState(
      {
        date: e.target.value
      },
      () => console.log(this.state)
    );
  }
  handleRoomCountChange(e) {
    this.setState(
      {
        [e.target.name]: parseFloat(e.target.value)
      },
      () => console.log(this.state)
    );
  }
  handleChangeRegularity(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => console.log(this.state)
    );
  }
  handleChangeDuration(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => console.log(this.state)
    );
  }
  calculatePrice() {
    let price = 0;
    console.log("click");
    price = (
      (this.props.services[this.state.cleaningType].smallRoom *
        this.state.smallRoomCount +
        this.props.services[this.state.cleaningType].largeRoom *
          this.state.largeRoomCount +
        this.props.services[this.state.cleaningType].toilet *
          this.state.toiletCount) *
      this.state.duration
    ).toFixed(2);
    console.log(price);
    this.setState({ price }, () => {
      console.log(this.state);
    });
  }
  render() {
    const { classes, services } = this.props;
    return (
      <>
        <Paper className={classes.root}>
          <Typography className={classes.header} variant="h4">
            Booking
          </Typography>
          <Divider className={classes.divider} variant="inset" />

          <form className={classes.form}>
            <div className={classes.address}>
              <InputLabel htmlFor="city">City</InputLabel>
              <Select
                className={classes.select}
                value={this.state.city}
                onChange={this.handleChangeCity}
                inputProps={{
                  name: "city",
                  id: "city"
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Mogilev">Mogilev</MenuItem>
                <MenuItem value="Grodno">Grodno</MenuItem>
                <MenuItem value="Minsk">Minsk</MenuItem>
                <MenuItem value="Brest">Brest</MenuItem>
                <MenuItem value="Vitebsk">Vitebsk</MenuItem>
                <MenuItem value="Gomel">Gomel</MenuItem>
              </Select>
              <TextField
                className={classes.textField}
                label="exact address"
                autoComplete="exactAddress"
                margin="normal"
                name="exactAddress"
                onChange={this.handleChangeCity}
              />
            </div>
            <div className="cleaningType">
              <InputLabel htmlFor="cleaningType">cleaning type</InputLabel>
              <Select
                className={classes.cleaningTypeSelect}
                value={this.state.cleaningType}
                onChange={this.handleChange}
                inputProps={{
                  name: "cleaningType",
                  id: "cleaningType"
                }}
              >
                {this.isAvailable(services.standart) && (
                  <MenuItem value="standart">standart</MenuItem>
                )}
                {this.isAvailable(services.general) && (
                  <MenuItem value="general">general</MenuItem>
                )}
                {this.isAvailable(services.afterRepair) && (
                  <MenuItem value="afterRepair">after repair</MenuItem>
                )}
                {this.isAvailable(services.carpetDryCleaning) && (
                  <MenuItem value="carpetDryCleaning">
                    carpet dry cleaning
                  </MenuItem>
                )}
                {this.isAvailable(services.office) && (
                  <MenuItem value="office">office</MenuItem>
                )}
                {this.isAvailable(services.industrialСleaning) && (
                  <MenuItem value="industrialСleaning">
                    industrial cleaning
                  </MenuItem>
                )}
                {this.isAvailable(services.furniture) && (
                  <MenuItem value="furniture">furniture</MenuItem>
                )}
                {this.isAvailable(services.pool) && (
                  <MenuItem value="pool">pool</MenuItem>
                )}
              </Select>
            </div>
            <div className="roomType">
              <TextField
                label="Small Room"
                margin="normal"
                name="smallRoomCount"
                disabled={this.state.smallRoomDisabled}
                onChange={this.handleRoomCountChange}
              />
              <TextField
                label="Large Room"
                margin="normal"
                name="largeRoomCount"
                disabled={this.state.largeRoomDisabled}
                onChange={this.handleRoomCountChange}
              />
              <TextField
                label="Toilet"
                margin="normal"
                name="toiletCount"
                disabled={this.state.toiletDisabled}
                onChange={this.handleRoomCountChange}
              />
            </div>
            <Pickers
              handleTimeChange={this.handleTimeChange}
              handleDateChange={this.handleDateChange}
            />
            <div className="deal">
              <InputLabel htmlFor="regularity">Regularity</InputLabel>
              <Select
                className={classes.select}
                value={this.state.regularity}
                onChange={this.handleChangeRegularity}
                inputProps={{
                  name: "regularity",
                  id: "regularity"
                }}
              >
                <MenuItem value={1.1}>ones</MenuItem>
                <MenuItem value={4}>weekly</MenuItem>
                <MenuItem value={2}>every 2 weeks</MenuItem>
                <MenuItem value={1}>monthly</MenuItem>
              </Select>
              <InputLabel htmlFor="duration">Duration</InputLabel>
              <Select
                className={classes.select}
                value={this.state.duration}
                onChange={this.handleChangeDuration}
                inputProps={{
                  name: "duration",
                  id: "duration"
                }}
              >
                <MenuItem value={1}>1 month</MenuItem>
                <MenuItem value={2}>2 months</MenuItem>
                <MenuItem value={3}>3 months</MenuItem>
                <MenuItem value={4}>4 months</MenuItem>
                <MenuItem value={5}>5 months</MenuItem>
                <MenuItem value={6}>6 months</MenuItem>
              </Select>
            </div>
            <div className="email">
            <TextField
                label="Email"
                margin="normal"
                name="email"
                type="email"
                defaultValue={this.state.email}
                onChange={this.handleChangeEmail}
              />
            </div>
            <Button onClick={this.calculatePrice}>
              <ConfirmPage
                disabled={!Boolean(this.state.cleaningType)}
                order={this.state}
              />
            </Button>
          </form>
        </Paper>
      </>
    );
  }
}

export default withStyles(styles)(BookingPage);
