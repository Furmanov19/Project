import React, { Component } from "react";
import Load from "../../../common/load";
import Pagination from "./OrderPaginationForUser";
import ExecutorOrderPaper from "./ExecutorOrdersPaper";
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

class ExecutorOrderPage extends Component {
  componentDidMount() {
    this.props.getExecutorOrders();
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
                  <ExecutorOrderPaper
                    key={order._id}
                    order={order}
                    changeOrderStatus={this.props.changeOrderStatus}
                    getExecutorOrders={this.props.getExecutorOrders}
                  />
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
export default withStyles(styles)(ExecutorOrderPage);
