import { connect } from 'react-redux';
import AdminProfilePage from '../components/home/main/ProfilePage/AdminProfilePage';

const mapStateToProps = state => ({
    id: state.auth.admin._id,
    role:state.auth.admin.role
});

export default connect(
    mapStateToProps,
    {}//block executor action
)(AdminProfilePage);