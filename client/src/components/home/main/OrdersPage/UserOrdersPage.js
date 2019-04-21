import React, { Component } from "react";
import Load from "../../../common/load";
import Pagination from "./OrderPaginationForUser";
import UserOrderPaper from "./UserOrdersPaper";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    width: "62%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "50px auto"
  }
});

class UserOrderPage extends Component {
  componentDidMount() {
    this.props.getUserOrders();
  }
  render() {
    const { classes } = this.props;
    return (
      <>
        {this.props.orders === undefined ? (
          <Load />
        ) : (
          <>
            <div className={classes.root}>
              {this.props.orders.length !== 0 ? (
                this.props.orders.map(order => (
                  <UserOrderPaper key={order._id} order={order} />
                ))
              ) : (
                <Typography variant="h5">There is no orders yet</Typography>
              )}
            </div>
            {this.props.orders.length && <Pagination />}
          </>
        )}
      </>
    );
  }
}

export default withStyles(styles)(UserOrderPage);
