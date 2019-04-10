import {
    SEARCH_INPUT_CHANGE,
    PRICE_SELECT_CHANGE,
    PAGINATION_PAGE_CHANGE,
    ADDRESS_SELECT_CHANGE,
    RATE_SELECT_CHANGE,
    POPULARITY_SELECT_CHANGE
} from '../actions/types';

const initialState={
    searchInput:"",
    offset:0,
    price:"",
    address:"",
    rate:"",
    popularity:""
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
        case ADDRESS_SELECT_CHANGE:
            return {
                ...state,
                address:action.payload
            }
        case RATE_SELECT_CHANGE:
        return {
            ...state,
            rate:action.payload
        }
        case POPULARITY_SELECT_CHANGE:
        return {
            ...state,
            popularity:action.payload
            }
        default:
            return state;
    }
}