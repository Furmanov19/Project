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

class ExecutorProfilePage extends Component {
  render() {
    const { classes, executor } = this.props;
    return (
      <>
        {executor === undefined || executor === "" ? (
          <Load />
        ) : (
          <Paper className={classes.root}>
            <List>
              <ListItem className={classes.listItem}>
                <Typography>Name</Typography>
                <Typography>{executor.name}</Typography>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem className={classes.listItem}>
                <Typography>E-mail</Typography>
                <Typography>{executor.email}</Typography>
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

export default withStyles(styles)(ExecutorProfilePage);
