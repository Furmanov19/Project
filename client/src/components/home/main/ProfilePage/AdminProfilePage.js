import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Load from "../../../common/load";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

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

class AdminProfilePage extends Component {
  render() {
    const { classes, admin } = this.props;
    return (
      <>
        {admin === undefined || admin === "" ? (
          <Load />
        ) : (
          <Paper className={classes.root}>
            <List>
              <ListItem className={classes.listItem}>
                <Typography>Name</Typography>
                <Typography>{admin.name}</Typography>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem className={classes.listItem}>
                <Typography>Created at</Typography>
                <Typography>{admin.created_at}</Typography>
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          </Paper>
        )}
      </>
    )
  }
}

export default withStyles(styles)(AdminProfilePage);
