import {
    SELECT_EXECUTOR,
    BLOCK_EXECUTOR,
    UNBLOCK_EXECUTOR
} from '../actions/types';

const initialState = {
    selectedExecutor:JSON.parse(localStorage.getItem('selectedExecutor'))
    //selectedExecutor:""
}

export default function (state = initialState, action) {
    switch(action.type) {
        case SELECT_EXECUTOR:
            localStorage.setItem('selectedExecutor',JSON.stringify(action.payload));
            return {
                selectedExecutor:action.payload
            }
        case BLOCK_EXECUTOR:
            return {
                selectedExecutor:action.payload
            }
        case UNBLOCK_EXECUTOR:
            return {
                selectedExecutor:action.payload
            }
        default:
        return state;
    }
}