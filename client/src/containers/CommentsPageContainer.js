import { connect } from "react-redux";
import {getExecutorComments} from '../actions/usersActions';
import CommentsPage from "../components/home/main/CommentsPage/CommentsPage";

const mapStateToProps = state => ({
    selectedExecutor: state.users.selectedExecutorForBooking._id
});

export default connect(
  mapStateToProps,
  {getExecutorComments}
)(CommentsPage);
