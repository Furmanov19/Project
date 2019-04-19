import axios from "axios";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./tokenConfig";

import {
  EXECUTORS_LOADING,
  EXECUTORS_LOADED,
  EXECUTORS_LOADING_FAIL,
  GET_EXECUTOR_ORDERS,
  GET_EXECUTOR_ORDERS_SUCCESS,
  GET_EXECUTOR_ORDERS_FAIL,
  CHANGE_ORDER_STATUS_SUCCESS,
  CHANGE_ORDER_STATUS_FAIL
} from "./types";

export const getExecutors = () => (dispatch, getState) => {
  //get params
  let offset = getState().search.offset;
  let search = getState().search.searchInput;
  let price = getState().search.price;
  let address = getState().search.address;
  let rate = getState().search.rate;
  let popularity = getState().search.popularity;

  //executors loading
  dispatch({ type: EXECUTORS_LOADING });

  //get executors
  axios
    .get(
      `executors?page=${++offset}&search=${search}&sortByPrice=${price}&sortByAddress=${address}&sortByRate=${rate}&sortByPopularity=${popularity}`
    )
    .then(res => {
      dispatch({
        type: EXECUTORS_LOADED,
        payload: res.data
      });
      getState().search.offset = 0;
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: EXECUTORS_LOADING_FAIL });
    });
};

export const getExecutorOrders = () => (dispatch, getState) => {
  //get params
  let offset = getState().search.offset;
  axios
    .get(`orders?page=${++offset}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_EXECUTOR_ORDERS_SUCCESS,
        payload: res.data
      });
      getState().search.offset = 0;
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: GET_EXECUTOR_ORDERS_FAIL });
    });
};

export const changeOrderStatus = (order_id, order_status,reason) => (
  dispatch,
  getState
) => {
  const body = {
    order_id,
    order_status,
    reason
  };

  axios
    .put("orders", body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: CHANGE_ORDER_STATUS_SUCCESS
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: CHANGE_ORDER_STATUS_FAIL });
    });
};
