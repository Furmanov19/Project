import { connect } from "react-redux";
import UserPaper from "../components/home/main/AdminPage/UserPaper";
import { SelectUser } from "../actions/adminsActions";

const mapStateToProps = state => ({
  error: state.error
});

export default connect(
  mapStateToProps,
  { SelectUser }
)(UserPaper);
