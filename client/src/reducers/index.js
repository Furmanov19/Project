import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import executorsReducer from './executorsReducer';
import searchReducer from './searchReducer';
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export default combineReducers({
    error:errorReducer,
    auth:authReducer,
    executors:executorsReducer,
    search:searchReducer,
    router:connectRouter(history)
});