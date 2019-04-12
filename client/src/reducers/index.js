import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import adminsReducer from './adminsReducer';
import executorsReducer from './executorsReducer';
import usersReducer from './usersReducer';
import searchReducer from './searchReducer';
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export default combineReducers({
    error:errorReducer,
    auth:authReducer,
    executors:executorsReducer,
    admins:adminsReducer,
    users:usersReducer,
    search:searchReducer,
    router:connectRouter(history)
});