import { connect } from "react-redux";
import BlockExecutorForm from "../components/home/main/AdminPage/BlockExecutorForm";
import { blockExecutor, unblockExecutor } from "../actions/adminsActions";

const mapStateToProps = state => ({
  error: state.error,
  selectedExecutor: state.admins.selectedExecutor
});

export default connect(
  mapStateToProps,
  { blockExecutor, unblockExecutor }
)(BlockExecutorForm);
