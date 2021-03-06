import { connect } from 'react-redux';
import { getExecutors } from '../actions/executorsActions';
import Main from '../components/home/main/Main'

const mapStateToProps = state => ({
    error: state.error,
    executors:state.executors.executors
});


export default connect(
    mapStateToProps,
    {getExecutors}
)(Main);