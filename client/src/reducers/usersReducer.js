import {
    USERS_LOADING,
    USERS_LOADED,
    USERS_LOADING_FAIL
} from '../actions/types';

const initialState = {
    isLoading: false,
    isLoaded: false,
    users: []
}

export default function (state = initialState, action ) {
    switch(action.type) {
        case USERS_LOADING:
            return {
                ...state,
                isLoading:true,
            }
        case USERS_LOADED:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                users: action.payload
            }
        case USERS_LOADING_FAIL:
            return {
                state:initialState
            }
        default:
        return state;
    }
}