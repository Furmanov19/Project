import axios from 'axios';
import {returnErrors} from './errorActions';

import {
    EXECUTORS_LOADING,
    EXECUTORS_LOADED,
    EXECUTORS_LOADING_FAIL
} from './types';


export const getExecutors = () => (dispatch,getState) => {
    //get params
    let page=getState().search.offset;
    let search=getState().search.searchInput;
    console.log("page",page);
    console.log("search",search)
    let price =getState().search.price;
    //executors loading
    dispatch({type:EXECUTORS_LOADING});
    //get executors
    axios
        .get(`executors?page=${++page}&search=${search}`)
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