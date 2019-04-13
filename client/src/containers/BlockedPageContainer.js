import { connect } from 'react-redux';
import BlockedPage from '../components/home/main/BlockedPage/BlockedPage';

const mapStateToProps = state => ({
    executor:state.auth.executor,
    user:state.auth.user
});

export default connect(
    mapStateToProps,
    {}//block executor action
)(BlockedPage);