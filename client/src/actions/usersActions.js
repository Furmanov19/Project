import axios from 'axios';
import { returnErrors} from './errorActions';

import {
    USERS_LOADING,
    USERS_LOADED,
    USERS_LOADING_FAIL
} from './types';


export const getUsers  = () => (dispatch,getState) => {
    //get params
    let offset = getState().search.offset;
    let search = getState().search.searchInput;

    //users loading
    dispatch({type:USERS_LOADING});

    //get users
    axios
        .get(`users?page=${++offset}&search=${search}`)
        .then(res =>
            {
                dispatch({
                    type:USERS_LOADED,
                    payload:res.data
                });
                getState().search.offset=0;
            }
        )
        .catch (err => {
            dispatch(returnErrors(err.response.data,err.response.status));
            dispatch({type:USERS_LOADING_FAIL});
            }
        )
}