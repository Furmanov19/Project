import { connect } from 'react-redux';
import ExecutorPaper from '../components/home/main/AdminPage/ExecutorPaper';
import {SelectExecutor} from '../actions/adminsActions';
const mapStateToProps = state => ({
    error: state.error
});

export default connect(
    mapStateToProps,
    {SelectExecutor}//block executor action
)(ExecutorPaper);