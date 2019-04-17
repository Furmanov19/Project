import { connect } from 'react-redux';
import { getExecutors } from '../actions/executorsActions';
import {selectExecutorForInfo} from '../actions/usersActions';
import Main from '../components/home/main/Main'

const mapStateToProps = state => ({
    error: state.error,
    executors:state.executors.executors.docs
});


export default connect(
    mapStateToProps,
    {getExecutors,selectExecutorForInfo}
)(Main);