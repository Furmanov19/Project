import axios from 'axios';
import {getExecutors} from './executorsActions';

import {
    SEARCH_INPUT_CHANGE,
    PRICE_SELECT_CHANGE,
    PAGINATION_PAGE_CHANGE
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
    getExecutors();
}
export const pageChange =(priceSelectChange) => (dispatch) =>{
    dispatch({
        type:PAGINATION_PAGE_CHANGE,
        payload:priceSelectChange
    });
    getExecutors();
}