import { connect } from "react-redux";
import { logout } from "../actions/authActions";
import Header from "../components/home/header/Header";

const mapStateToProps = state => ({
  error: state.error,
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
  executor: state.auth.executor,
  admin: state.auth.admin
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
