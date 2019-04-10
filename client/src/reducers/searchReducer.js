import {
    SEARCH_INPUT_CHANGE,
    PRICE_SELECT_CHANGE,
    PAGINATION_PAGE_CHANGE
} from '../actions/types';

const initialState={
    searchInput:"",
    offset:0,
    price:null
}

export default function (state = initialState, action){
    switch(action.type) {
        case SEARCH_INPUT_CHANGE:
            return {
                ...state,
                searchInput:action.payload
            }
        case PRICE_SELECT_CHANGE:
        return {
            ...state,
            price:action.payload
        }
        case PAGINATION_PAGE_CHANGE:
        return {
            ...state,
            offset:action.payload
        }
        default:
            return state;
    }
}