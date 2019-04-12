import axios from 'axios';
import {returnErrors} from './errorActions';

import {
    SELECT_EXECUTOR,
    BLOCK_EXECUTOR,
    UNBLOCK_EXECUTOR,
    BLOCK_EXECUTOR_FAIL,
    UNBLOCK_EXECUTOR_FAIL
} from './types';

export const SelectExecutor =(executorId) => (dispatch) =>{
    dispatch({
        type:SELECT_EXECUTOR,
        payload:executorId
    });
}
export const blockExecutor =(executorId,reason) => (dispatch) =>{
     //headers
     const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    //request body
    const body =JSON.stringify({
        reason
    });

    axios
        .put(`executors/block/${executorId}`,body,config)
        .then((res) => {
            dispatch({
                type:BLOCK_EXECUTOR,
                payload:res.data
            });
        })
        .catch( err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({type:BLOCK_EXECUTOR_FAIL});
        });
    
}
export const unbLockExecutor =(executorId) => (dispatch) =>{
    dispatch({
        type:UNBLOCK_EXECUTOR,
        payload:executorId
    });
}