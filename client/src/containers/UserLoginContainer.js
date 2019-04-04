import { connect } from 'react-redux';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import UserLoginForm from '../components/home/main/UserLoginForm';


const mapStateToProps = state => ({
    error: state.error,
    user:state.auth.user
});

export default connect(
    mapStateToProps,
    {login,clearErrors}
)(UserLoginForm);