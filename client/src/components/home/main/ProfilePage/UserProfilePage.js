import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Load from "../../../common/load";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { EditProfileLink } from "../../../common/Links";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    margin: "5% auto",
    padding: "3%",
    borderRadius: "5px"
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between"
  },
  button: {
    margin: theme.spacing.unit,
    marginLeft: "5%"
  }
});

class UserProfilePage extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  render() {
    const { classes, user } = this.props;
    return (
      <>
        {user === undefined || user === "" ? (
          <Load />
        ) : (
          <Paper className={classes.root}>
            <List>
              <ListItem className={classes.listItem}>
                <Typography>Name</Typography>
                <Typography>{user.name}</Typography>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem className={classes.listItem}>
                <Typography>E-mail</Typography>
                <Typography>{user.email}</Typography>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem className={classes.listItem}>
                <Typography>Phone Number</Typography>
                <Typography>{user.phone}</Typography>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem className={classes.listItem}>
                <Typography>Account created at</Typography>
                <Typography>{user.created_at}</Typography>
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              component={EditProfileLink}
            >
              EDIT
            </Button>
          </Paper>
        )}
      </>
    );
  }
}

export default withStyles(styles)(UserProfilePage);
