import { connect } from 'react-redux';
import { registerExecutor } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import ExecutorRegistrationForm from '../components/home/main/RegistrationPage/ExecutorRegistrationForm';


const mapStateToProps = state => ({
    error: state.error,
    executor:state.auth.executor
});

export default connect(
    mapStateToProps,
    {registerExecutor,clearErrors}
)(ExecutorRegistrationForm);