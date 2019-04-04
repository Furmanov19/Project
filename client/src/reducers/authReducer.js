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
} from '../actions/types';

const initialState ={
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    isConfirmed:false,
    user : null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading:true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                isConfirmed:true,
                user: action.payload
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                user:action.payload,
                isAuthenticated:true,
                isConfirmed:false,
                isLoading:false
            };
        case LOGIN_SUCCESS:
        case REGISTER_CONFIRM_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            return {
                ...state,
                user:action.payload.user,
                isConfirmed:true
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
        case REGISTER_CONFIRM_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token:null,
                user:null,
                isAuthenticated:false,
                isLoading:false
            }
        default:
            return state;
    }
}