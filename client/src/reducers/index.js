import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import executorsReducer from './executorsReducer';

export default combineReducers({
    error:errorReducer,
    auth:authReducer,
    executors:executorsReducer
});