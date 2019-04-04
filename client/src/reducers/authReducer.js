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
} from '../actions/types';

const initialState ={
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    isConfirmed:false,
    user : null,
    executor:null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
        case EXECUTOR_LOADING:
            return {
                ...state,
                isLoading:true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                isConfirmed: true,
                user: action.payload,
                executor:null
            }
            case EXECUTOR_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                isConfirmed: true,
                user: null,
                executor: action.payload
            }
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated:true,
                isConfirmed:false,
                isLoading:false,
                user:action.payload,
                executor:null
            };
        case EXECUTOR_REGISTER_SUCCESS:
        return {
            ...state,
            isAuthenticated: true,
            isConfirmed: false,
            isLoading: false,
            user: null,
            executor: action.payload
        };
        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_CONFIRM_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            return {
                ...state,
                isConfirmed: true,
                user: action.payload.user,
                executor: null
            };
        case EXECUTOR_LOGIN_SUCCESS:
        case EXECUTOR_REGISTER_CONFIRM_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            return {
                ...state,
                isConfirmed: true,
                user: null,
                executor: action.payload.user
            };
        case AUTH_ERROR:
        case USER_LOGIN_FAIL:
        case EXECUTOR_LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case USER_REGISTER_FAIL:
        case USER_REGISTER_CONFIRM_FAIL:
        case EXECUTOR_REGISTER_FAIL:
        case EXECUTOR_REGISTER_CONFIRM_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token:null,
                user:null,
                executor:null,
                isAuthenticated:false,
                isLoading:false
            }
        default:
            return state;
    }
}