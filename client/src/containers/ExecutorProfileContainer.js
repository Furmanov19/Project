import { connect } from "react-redux";
import ExecutorProfilePage from "../components/home/main/ProfilePage/ExecutorProfilePage";

const mapStateToProps = state => ({
  executor: state.auth.executor
});

export default connect(
  mapStateToProps,
  {}
)(ExecutorProfilePage);
