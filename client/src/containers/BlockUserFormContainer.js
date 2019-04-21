import { connect } from "react-redux";
import BlockUserForm from "../components/home/main/AdminPage/BlockUserForm";
import { blockUser, unblockUser } from "../actions/adminsActions";

const mapStateToProps = state => ({
  error: state.error,
  selectedUser: state.admins.selectedUser
});

export default connect(
  mapStateToProps,
  { blockUser, unblockUser }
)(BlockUserForm);
