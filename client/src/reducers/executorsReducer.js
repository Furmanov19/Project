import {
    EXECUTORS_LOADING,
    EXECUTORS_LOADED,
    EXECUTORS_LOADING_FAIL,
    GET_EXECUTOR_ORDERS,
    GET_EXECUTOR_ORDERS_SUCCESS,
    GET_EXECUTOR_ORDERS_FAIL
} from '../actions/types';

const initialState = {
    isLoading:false,
    isLoaded:false,
    executors: [],
    orders:[]
}

export default function (state = initialState, action) {
    switch(action.type) {
        case EXECUTORS_LOADING:
            return {
                ...state,
                isLoading:true,
            }
        case EXECUTORS_LOADED:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                executors: action.payload
            }
        case GET_EXECUTOR_ORDERS_SUCCESS:{
            return {
                ...state,
                orders:action.payload
            }
        }
        case EXECUTORS_LOADING_FAIL:
        case GET_EXECUTOR_ORDERS_FAIL:
            return {
                state:initialState
            }
        default:
        return state;
    }
}