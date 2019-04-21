import { connect } from "react-redux";
import ExecutorBlockedPage from "../components/home/main/BlockedPage/ExecutorBlockedPage";

const mapStateToProps = state => ({
  executor: state.auth.executor
});

export default connect(
  mapStateToProps,
  {} //block executor action
)(ExecutorBlockedPage);
