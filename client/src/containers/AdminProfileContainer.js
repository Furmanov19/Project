import { connect } from 'react-redux';
import AdminProfilePage from '../components/home/main/ProfilePage/AdminProfilePage';

const mapStateToProps = state => ({
    admin:state.auth.admin
});

export default connect(
    mapStateToProps,
    {}//block executor action
)(AdminProfilePage);