import { connect } from 'react-redux';
import BlockExecutorForm from '../components/home/main/AdminPage/BlockExecutorForm';
import { blockExecutor } from '../actions/adminsActions';

const mapStateToProps = state => ({
    error: state.error,
    selectedExecutor:state.admins.selectedExecutor
});

export default connect(
    mapStateToProps,
    {blockExecutor}//block executor action
)(BlockExecutorForm);