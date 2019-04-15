import { connect } from 'react-redux';
import UserProfilePage from '../components/home/main/ProfilePage/UserProfilePage';


const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(
    mapStateToProps,
    {}
)(UserProfilePage);