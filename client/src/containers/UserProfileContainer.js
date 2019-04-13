import { connect } from 'react-redux';
import UserProfilePage from '../components/home/main/ProfilePage/UserProfilePage';


const mapStateToProps = state => ({
    id: state.auth.user._id,
    role:state.auth.user.role
});

export default connect(
    mapStateToProps,
    {}
)(UserProfilePage);