import { connect } from "react-redux";
import { getExecutors } from "../actions/executorsActions";
import ListOfExecutors from "../components/home/main/AdminPage/ListOfExecutors";

const mapStateToProps = state => ({
  error: state.error,
  executors: state.executors.executors.docs
});

export default connect(
  mapStateToProps,
  { getExecutors }
)(ListOfExecutors);
