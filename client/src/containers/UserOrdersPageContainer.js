import { connect } from "react-redux";
import { getUserOrders } from "../actions/usersActions";
import UserOrdersPage from "../components/home/main/OrdersPage/UserOrdersPage";

const mapStateToProps = state => ({
  orders: state.users.orders.docs
});

export default connect(
  mapStateToProps,
  { getUserOrders }
)(UserOrdersPage);
