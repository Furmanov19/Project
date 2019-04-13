import axios from 'axios';
import {returnErrors} from './errorActions';
import {tokenConfig} from './tokenConfig';

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
export const blockExecutor =(executorId,reason) => (dispatch,getState) =>{
     

    //request body
    const body =JSON.stringify({
        reason
    });

    axios
        .put(`executors/block/${executorId}`,body,tokenConfig(getState))
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
export const unblockExecutor =(executorId) => (dispatch,getState) =>{
    axios
        .put(`executors/unblock/${executorId}`,{},tokenConfig(getState))
        .then((res) => {
            dispatch({
                type:UNBLOCK_EXECUTOR,
                payload:res.data
            });
        })
        .catch( err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({type:UNBLOCK_EXECUTOR_FAIL});
        });
}