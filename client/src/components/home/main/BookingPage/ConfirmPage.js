import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    width: "500px",
    margin: "0 auto"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

function ConfirmPage(props) {
  const { classes } = props;
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  return (
    <>
      <Button
        color="primary"
        onClick={handleClickOpen}
        disabled={props.disabled}
      >
        Check order
      </Button>
      <Dialog open={open} onClose={handleClose} className={classes.root}>
        <List>
          <ListItem>
            <Typography variant="h5">City: {props.order.city}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="h5">
              Address: {props.order.exactAddress}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography variant="h5">
              Cleaning type: {props.order.cleaningType}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="h5">
              Small rooms: {props.order.smallRoomCount}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="h5">
              Large rooms: {props.order.largeRoomCount}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="h5">
              Toilets: {props.order.toiletCount}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography variant="h5">Date: {props.order.date}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="h5">Time: {props.order.time}</Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography variant="h5">
              Regularity: {props.order.regularityText}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="h5">
              Duration: {props.order.durationText}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography variant="h5">Price: {props.order.price} $</Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography variant="h5">Email: {props.order.email}</Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Button
              color="primary"
              onClick={() => {
                props.createOrder();
              }}
            >
              Confirm
            </Button>
            <Button color="secondary" onClick={handleClose}>
              Hide
            </Button>
          </ListItem>
        </List>
      </Dialog>
    </>
  );
}

export default withStyles(styles)(ConfirmPage);
