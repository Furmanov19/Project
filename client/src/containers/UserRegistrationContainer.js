import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import UserRegistrationForm from "../components/home/main/RegistrationPage/UserRegistrationForm";

const mapStateToProps = state => ({
  error: state.error,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { registerUser, clearErrors }
)(UserRegistrationForm);
