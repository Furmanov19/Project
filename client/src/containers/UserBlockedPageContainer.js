import { connect } from "react-redux";
import UserBlockedPage from "../components/home/main/BlockedPage/UserBlockedPage";

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  {}
)(UserBlockedPage);
