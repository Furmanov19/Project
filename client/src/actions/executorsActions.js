import axios from 'axios';
import {returnErrors} from './errorActions';

import {
    EXECUTORS_LOADING,
    EXECUTORS_LOADED,
    EXECUTORS_LOADING_FAIL
} from './types';


export const getExecutors = (offset=0) => dispatch => {
    //executors loading
    console.log("offset",offset);
    dispatch({type:EXECUTORS_LOADING});
    let page=++offset;
    console.log("page",page);
    //get executors
    axios
        .get(`executors?page=${page}`)
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