import { connect } from 'react-redux';
import { loginAdmin } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import AdminLoginForm from '../components/home/main/LoginPage/AdminLoginForm';


const mapStateToProps = state => ({
    error: state.error,
    admin:state.auth.admin
});

export default connect(
    mapStateToProps,
    {loginAdmin,clearErrors}
)(AdminLoginForm);