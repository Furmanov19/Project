import { connect } from 'react-redux';
import { registerConfirmUser, registerConfirmExecutor} from '../actions/authActions';
import ConfirmForm from '../components/home/main/RegistrationPage/ConfirmForm';

const mapStateToProps = state => ({
    error: state.error,
    user:state.auth.user
});


export default connect(
    mapStateToProps,
    {registerConfirmUser,registerConfirmExecutor}
)(ConfirmForm);