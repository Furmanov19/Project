import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import AdminLoginForm from '../components/home/main/LoginPage/AdminLoginForm';


const mapStateToProps = state => ({
    error: state.error,
    user:state.auth.user
});

export default connect(
    mapStateToProps,
    {loginUser,clearErrors}
)(AdminLoginForm);