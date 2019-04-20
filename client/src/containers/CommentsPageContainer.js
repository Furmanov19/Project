import { connect } from "react-redux";
import { getExecutorComments, postComment } from "../actions/usersActions";
import CommentsPage from "../components/home/main/CommentsPage/CommentsPage";
import {goBackFanc} from "../actions/goBackActions";
const mapStateToProps = state => ({
  selectedExecutor: state.users.selectedExecutorForBooking._id,
  comments: state.users.selectedExecutorComments.docs,
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { getExecutorComments, postComment,goBackFanc }
)(CommentsPage);
