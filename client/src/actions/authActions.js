import axios from 'axios';
import {returnErrors,clearErrors} from './errorActions';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REGISTER_CONFIRM_SUCCESS,
    REGISTER_CONFIRM_FAIL
} from './types';

// check token & load user
export const loadUser = () => (dispatch,getState) => {
    //user loading
    dispatch({type: USER_LOADING});

    axios
        .get('http://localhost:3001/api/users/current',tokenConfig(getState))       
        .then( res =>
            {
                dispatch(clearErrors());
                dispatch({
                    type: USER_LOADED,
                    payload:res.data
                });
            }
        )
        .catch( err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({type:AUTH_ERROR});
        });
};

//register user
export const register = ({ name, email, phone, password }) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    //request body
    const body =JSON.stringify({
        name,
        email,
        phone,
        password
    });

    axios
        .post('http://localhost:3001/api/users/register',body,config)
        .then(res => 
            {
                dispatch(clearErrors());
                dispatch({
                    type:REGISTER_SUCCESS,
                    payload:res.data
                });
            }
        )
        .catch(err => {
                console.log(err);
            dispatch(
                returnErrors(
                    err.response.data,
                    err.response.status,
                    'REGISTER_FAIL'
                )
            );
            dispatch({
                type:REGISTER_FAIL
            });
        });
};

export const registerConfirm = (obj) => dispatch => {
    //headers
    const config = {
        headers : {
            'Content-Type': 'application/json'
        }
    }
    axios
        .post('http://localhost:3001/api/users/register/confirm',obj,config)
        .then(res => 
                {
                    dispatch(clearErrors());
                    dispatch({
                    type:REGISTER_CONFIRM_SUCCESS,
                    payload:res.data
                    });
            }
        )
        .catch(err =>{
            dispatch(
                returnErrors(err.response.data,err.response.status,'REGISTER_CONFIRM_FAIL')
            );
            dispatch({
                type:REGISTER_CONFIRM_FAIL
            });
        });

}

export const login = (obj) => dispatch => {
    //headers
    const config = {
        headers : {
            'Content-Type': 'application/json'
        }
    }

    axios
        .post('http://localhost:3001/api/users/signin',obj,config)
        .then(res => 
            {
                dispatch(clearErrors());
                dispatch({
                    type:LOGIN_SUCCESS,
                    payload:res.data
                });
            }
        )
        .catch(err =>{
            dispatch(
                returnErrors(err.response.data,err.response.status,'LOGIN_FAIL')
            );
            dispatch({
                type:LOGIN_FAIL
            });
        });
}

//logout user
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}


// Setup config/headers and token
export const tokenConfig = getState => {
    // Get token from localstorage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    // If token, add to headers
    if (token) {
        config.headers['Authorization'] ="Bearer " + token;
    }

    return config;
};
