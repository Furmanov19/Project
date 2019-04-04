import { connect } from 'react-redux';
import { registerConfirmUser } from '../actions/authActions';
import ConfirmForm from '../components/home/main/ConfirmForm';

const mapStateToProps = state => ({
    error: state.error,
    user:state.auth.user
});


export default connect(
    mapStateToProps,
    {registerConfirmUser}
)(ConfirmForm);