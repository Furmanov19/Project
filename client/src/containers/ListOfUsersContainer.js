import { connect } from 'react-redux';
import { getUsers } from '../actions/usersActions';
import ListOfUsers from '../components/home/main/AdminPage/ListOfUsers'

const mapStateToProps = state => ({
    error: state.error,
    users:state.users.users.docs
});


export default connect(
    mapStateToProps,
    {getUsers}
)(ListOfUsers);