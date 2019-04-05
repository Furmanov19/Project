import { connect } from 'react-redux';
import { loginExecutor } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import ExecutorLoginForm from '../components/home/main/ExecutorLoginForm';


const mapStateToProps = state => ({
    error: state.error,
    user:state.auth.user
});

export default connect(
    mapStateToProps,
    {loginExecutor,clearErrors}
)(ExecutorLoginForm);