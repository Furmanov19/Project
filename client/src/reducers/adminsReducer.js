import {
    SELECT_EXECUTOR,
    BLOCK_EXECUTOR,
    UNBLOCK_EXECUTOR
} from '../actions/types';

const initialState = {
    selectedExecutor:"",
    isBlocked:false
}

export default function (state = initialState, action) {
    switch(action.type) {
        case SELECT_EXECUTOR:
            return {
                ...state,
                selectedExecutor:action.payload
            }
        case BLOCK_EXECUTOR:
            return {
                ...state,
                selectedExecutor:action.payload,
                isBlocked:true
            }
        case UNBLOCK_EXECUTOR:
            return {
                ...state,
                selectedExecutor:action.payload,
                isBlocked:false
            }
        default:
        return state;
    }
}