import { createStore, applyMiddleware, compose } from 'redux'; 
import { logger } from 'redux-logger'
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { routerMiddleware } from "connected-react-router";
import {history} from './reducers/index';

const initialState={};

const middleWare=[thunk,logger,routerMiddleware(history)];

const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleWare))
);


export default store;