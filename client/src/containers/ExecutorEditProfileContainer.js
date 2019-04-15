import { connect } from 'react-redux';
import { editExecutor } from '../actions/authActions';

import ExecutorEditProfile from '../components/home/main/EditProfilePage/ExecutorEditProfile';


const mapStateToProps = state => ({
    executor:state.auth.executor,
    services:state.auth.executor.services
});

export default connect(
    mapStateToProps,
    {editExecutor}
)(ExecutorEditProfile);