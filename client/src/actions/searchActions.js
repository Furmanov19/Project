import axios from 'axios';

import {
    SEARCH_INPUT_CHANGE,
    PRICE_SELECT_CHANGE,
    PAGINATION_PAGE_CHANGE,
    ADDRESS_SELECT_CHANGE,
    RATE_SELECT_CHANGE,
    POPULARITY_SELECT_CHANGE
} from './types';

export const searchInputChange =(inputValue) => (dispatch) =>{
    dispatch({
        type:SEARCH_INPUT_CHANGE,
        payload:inputValue
    });
}
export const priceSelectChange =(priceValue) => (dispatch) =>{
    dispatch({
        type:PRICE_SELECT_CHANGE,
        payload:priceValue
    });
}
export const pageChange = (page) => (dispatch) =>{
    dispatch({
        type:PAGINATION_PAGE_CHANGE,
        payload:page
    });
}
export const addressSelectChange =(address) => (dispatch) =>{
    dispatch({
        type:ADDRESS_SELECT_CHANGE,
        payload:address
    });
}
export const rateSelectChange =(rate) => (dispatch) =>{
    dispatch({
        type:RATE_SELECT_CHANGE,
        payload:rate
    });
}
export const popularitySelectChange =(popularity) => (dispatch) =>{
    dispatch({
        type:POPULARITY_SELECT_CHANGE,
        payload:popularity
    });
}