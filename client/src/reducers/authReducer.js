import {
    ADMIN_LOADING,
    ADMIN_LOADED,
    ADMIN_LOADING_FAIL,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAIL,
    ADMIN_REGISTER_SUCCESS,
    ADMIN_REGISTER_FAIL,
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
} from '../actions/types';

const initialState ={
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user : null,
    executor:null,
    admin:null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADMIN_LOADING:
        case USER_LOADING:
        case EXECUTOR_LOADING:
            return {
                ...state,
                isLoading:true
            };
        case ADMIN_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: null,
                executor:null,
                admin:action.payload
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
                executor:null,
                admin:null
            }
        case EXECUTOR_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: null,
                executor: action.payload,
                admin:null
            }
        case ADMIN_LOADING_FAIL:
            return {
                ...state,
                admin: null
            };
        case USER_LOADING_FAIL:
            return {
                ...state,
                user: null
            };
        case EXECUTOR_LOADING_FAIL:
            return {
                ...state,
                executor: null
            };
        case ADMIN_REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated:false,
                isLoading:false,
                user:null,
                executor:null,
                admin:action.payload,
            };
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated:false,
                isLoading:false,
                user:action.payload,
                executor:null,
                admin:null
            };
        case EXECUTOR_REGISTER_SUCCESS:
        return {
            ...state,
            isAuthenticated: false,
            isLoading: false,
            user: null,
            executor: action.payload,
            admin:null
        };
        case ADMIN_LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                user: null,
                executor: null,
                admin:action.payload.admin
            };
        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_CONFIRM_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                executor: null,
                admin:null
            };
        case EXECUTOR_LOGIN_SUCCESS:
        case EXECUTOR_REGISTER_CONFIRM_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                user: null,
                executor: action.payload.executor,
                admin:null
            };
        case AUTH_ERROR:
        case ADMIN_LOGIN_FAIL:
        case USER_LOGIN_FAIL:
        case EXECUTOR_LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case USER_REGISTER_FAIL:
        case USER_REGISTER_CONFIRM_FAIL:
        case EXECUTOR_REGISTER_FAIL:
        case EXECUTOR_REGISTER_CONFIRM_FAIL:
            localStorage.removeItem('token');//тк загружается сразу 2 юзера и происходит удаление токена то на одного из низ выбрасывает ошибку
            return {
                ...state,
                token:null,
                user:null,
                executor:null,
                admin:null,
                isAuthenticated:false,
                isLoading:false
            }
        default:
            return state;
    }
}