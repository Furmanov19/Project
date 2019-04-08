import axios from 'axios';
import {returnErrors,clearErrors} from './errorActions';
import {push} from 'connected-react-router';
import {
    USER_LOADING,
    USER_LOADED,
    USER_LOADING_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_CONFIRM_SUCCESS,
    USER_REGISTER_CONFIRM_FAIL,
    EXECUTOR_LOADING,
    EXECUTOR_LOADED,
    EXECUTOR_LOADING_FAIL,
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
        .get('users/current',tokenConfig(getState))       
        .then( res =>
            {
                dispatch(clearErrors());
                dispatch({
                    type: USER_LOADED,
                    payload:res.data
                });
            }
        )
        .then(() => {
            dispatch(push('/profile'));
        })
        .catch( err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({type:USER_LOADING_FAIL});
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
        .post('users/register',body,config)
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
        .post('users/register/confirm',obj,config)
        .then(res => 
                {
                    dispatch(clearErrors());
                    dispatch({
                    type:USER_REGISTER_CONFIRM_SUCCESS,
                    payload:res.data
                    });
            }
        )
        .then(() => {
            dispatch(push('/profile'));
        })
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
        .post('users/signin',obj,config)
        .then(res => 
            {
                dispatch(clearErrors());
                dispatch({
                    type:USER_LOGIN_SUCCESS,
                    payload:res.data
                });
            }
        )
        .then(() => {
            dispatch(push('/profile'));
        })
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
        .get('executors/current',tokenConfig(getState))       
        .then( res =>
            {
                dispatch(clearErrors());
                dispatch({
                    type: EXECUTOR_LOADED,
                    payload:res.data
                });
            }
        )
        .then(() => {
            dispatch(push('/profile'));
        })
        .catch( err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({type:EXECUTOR_LOADING_FAIL});
        });
};

//register executor
export const registerExecutor = (executor) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    //request body
    const body =JSON.stringify( executor );

    axios
        .post('executors/register',body,config)
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
        .post('executors/register/confirm',obj,config)
        .then(res => 
                {
                    dispatch(clearErrors());
                    dispatch({
                    type:EXECUTOR_REGISTER_CONFIRM_SUCCESS,
                    payload:res.data
                    });
            }
        )
        .then(() => {
            dispatch(push('/profile'));
        })
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
        .post('executors/signin',obj,config)
        .then(res => 
            {
                dispatch(clearErrors());
                dispatch({
                    type:EXECUTOR_LOGIN_SUCCESS,
                    payload:res.data
                });
            }
        )
        .then(() => {
            dispatch(push('/profile'));
        })
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
export const logout = () => dispatch => {
    dispatch(push('/'));
    dispatch({type: LOGOUT_SUCCESS});
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
