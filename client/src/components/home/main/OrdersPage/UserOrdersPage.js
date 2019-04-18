import React, { Component } from "react";
import Load from "../../../common/load";
import Pagination from "./OrderPaginationForUser";
import UserOrderPaper from "./UserOrdersPaper";

export default class UserOrderPage extends Component {
  componentDidMount() {
    this.props.getUserOrders();
  }
  render() {
    return (
      <>
        {this.props.orders === undefined ? (
          <Load />
        ) : (
          <div>
            {this.props.orders.map(order => (
              <UserOrderPaper key={order._id} order={order} />
            ))}
            <Pagination />
          </div>
        )}
      </>
    );
  }
}
