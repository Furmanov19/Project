import axios from 'axios';
import {returnErrors} from './errorActions';

import {
    EXECUTORS_LOADING,
    EXECUTORS_LOADED,
    EXECUTORS_LOADING_FAIL
} from './types';


export const getExecutors = () => dispatch => {
    //executors loading
    dispatch({type:EXECUTORS_LOADING});
    
    //get executors
    axios
        .get('http://localhost:3001/api/executors')
        .then(res =>
            dispatch({
                type:EXECUTORS_LOADED,
                payload:res.data
            })
        )
        .catch (err =>{
                dispatch(returnErrors(err.response.data,err.response.status));
                dispatch({type:EXECUTORS_LOADING_FAIL});
            }
        )
}