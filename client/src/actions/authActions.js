import axios from 'axios';
import {returnErrors,clearErrors} from './errorActions';

import {
    USER_LOADING,
    USER_LOADED,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_CONFIRM_SUCCESS,
    USER_REGISTER_CONFIRM_FAIL,
    EXECUTOR_LOADING,
    EXECUTOR_LOADED,
    EXECUTOR_LOGIN_SUCCESS,
    EXECUTOR_LOGIN_FAIL,
    EXECUTOR_REGISTER_SUCCESS,
    EXECUTOR_REGISTER_FAIL,
    EXECUTOR_REGISTER_CONFIRM_SUCCESS,
    EXECUTOR_REGISTER_CONFIRM_FAIL,
    LOGOUT_SUCCESS,
    AUTH_ERROR
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
export const registerUser = ({ name, email, phone, password }) => dispatch => {
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
                    type:USER_REGISTER_SUCCESS,
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
                    'USER_REGISTER_FAIL'
                )
            );
            dispatch({
                type:USER_REGISTER_FAIL
            });
        });
};

export const registerConfirmUser = (obj) => dispatch => {
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
                    type:USER_REGISTER_CONFIRM_SUCCESS,
                    payload:res.data
                    });
            }
        )
        .catch(err =>{
            dispatch(
                returnErrors(err.response.data,err.response.status,'USER_REGISTER_CONFIRM_FAIL')
            );
            dispatch({
                type:USER_REGISTER_CONFIRM_FAIL
            });
        });

}

export const loginUser = (obj) => dispatch => {
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
                    type:USER_LOGIN_SUCCESS,
                    payload:res.data
                });
            }
        )
        .catch(err =>{
            dispatch(
                returnErrors(err.response.data,err.response.status,'USER_LOGIN_FAIL')
            );
            dispatch({
                type:USER_LOGIN_FAIL
            });
        });
}


// check token & load executor
export const loadExecutor = () => (dispatch,getState) => {
    //executor loading
    dispatch({type: EXECUTOR_LOADING});

    axios
        .get('http://localhost:3001/api/executors/current',tokenConfig(getState))       
        .then( res =>
            {
                dispatch(clearErrors());
                dispatch({
                    type: EXECUTOR_LOADED,
                    payload:res.data
                });
            }
        )
        .catch( err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({type:AUTH_ERROR});
        });
};

//register executor
export const registerExecutor = ({ name, email, phone, password }) => dispatch => {
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
        .post('http://localhost:3001/api/executors/register',body,config)
        .then(res => 
            {
                dispatch(clearErrors());
                dispatch({
                    type:EXECUTOR_REGISTER_SUCCESS,
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
                    'EXECUTOR_REGISTER_FAIL'
                )
            );
            dispatch({
                type:EXECUTOR_REGISTER_FAIL
            });
        });
};

export const registerConfirmExecutor = (obj) => dispatch => {
    //headers
    const config = {
        headers : {
            'Content-Type': 'application/json'
        }
    }
    axios
        .post('http://localhost:3001/api/executors/register/confirm',obj,config)
        .then(res => 
                {
                    dispatch(clearErrors());
                    dispatch({
                    type:EXECUTOR_REGISTER_CONFIRM_SUCCESS,
                    payload:res.data
                    });
            }
        )
        .catch(err =>{
            dispatch(
                returnErrors(err.response.data,err.response.status,'EXECUTOR_REGISTER_CONFIRM_FAIL')
            );
            dispatch({
                type:EXECUTOR_REGISTER_CONFIRM_FAIL
            });
        });

}

export const loginExecutor = (obj) => dispatch => {
    //headers
    const config = {
        headers : {
            'Content-Type': 'application/json'
        }
    }

    axios
        .post('http://localhost:3001/api/executors/signin',obj,config)
        .then(res => 
            {
                dispatch(clearErrors());
                dispatch({
                    type:EXECUTOR_LOGIN_SUCCESS,
                    payload:res.data
                });
            }
        )
        .catch(err =>{
            dispatch(
                returnErrors(err.response.data,err.response.status,'EXECUTOR_LOGIN_FAIL')
            );
            dispatch({
                type:EXECUTOR_LOGIN_FAIL
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
