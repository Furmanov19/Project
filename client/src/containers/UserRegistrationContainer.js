import { connect } from 'react-redux';
import { register } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import UserRegistrationForm from '../components/home/main/UserRegistrationForm';


const mapStateToProps = state => ({
    error: state.error,
    user:state.auth.user
});

export default connect(
    mapStateToProps,
    {register,clearErrors}
)(UserRegistrationForm);