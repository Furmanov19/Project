import { connect } from "react-redux";
import { editUser } from "../actions/authActions";
import UserEditProfile from "../components/home/main/EditProfilePage/UserEditProfile";

const mapStateToProps = state => ({
  user: state.auth.user,
  name: state.auth.user.name,
  phone: state.auth.user.phone
});

export default connect(
  mapStateToProps,
  { editUser }
)(UserEditProfile);
