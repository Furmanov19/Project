import { connect } from 'react-redux';
import { register } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import ExecutorRegistrationForm from '../components/home/main/ExecutorRegistrationForm';


const mapStateToProps = state => ({
    error: state.error,
    user:state.auth.user
});

export default connect(
    mapStateToProps,
    {register,clearErrors}
)(ExecutorRegistrationForm);