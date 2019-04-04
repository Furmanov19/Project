import {
    EXECUTORS_LOADING,
    EXECUTORS_LOADED,
    EXECUTORS_LOADING_FAIL
} from '../actions/types';

const initialState = {
    isLoading:false,
    isLoaded:false,
    executors: []
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
        case EXECUTORS_LOADING_FAIL:
            return {
                state:initialState
            }
        default:
        return state;
    }
}