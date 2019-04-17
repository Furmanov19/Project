import axios from "axios";
import { returnErrors } from "./errorActions";
import { push } from "connected-react-router";
import {
  USERS_LOADING,
  USERS_LOADED,
  USERS_LOADING_FAIL,
  SELECT_EXECUTOR_FOR_BOOKING,
  CREATE_ORDER,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL
} from "./types";

export const getUsers = () => (dispatch, getState) => {
  //get params
  let offset = getState().search.offset;
  let search = getState().search.searchInput;

  //users loading
  dispatch({ type: USERS_LOADING });

  //get users
  axios
    .get(`users?page=${++offset}&search=${search}`)
    .then(res => {
      dispatch({
        type: USERS_LOADED,
        payload: res.data
      });
      getState().search.offset = 0;
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: USERS_LOADING_FAIL });
    });
};
export const selectExecutorForInfo = executorId => dispatch => {
  dispatch({
    type: SELECT_EXECUTOR_FOR_BOOKING,
    payload:executorId
  });
  dispatch(push("/company"));
};
export const createOrder = order => (dispatch,getState) => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //request body
  const body = JSON.stringify(order);

  axios.
    post("orders/create",body,config)
  dispatch({
    type: SELECT_EXECUTOR_FOR_BOOKING,
    payload:order
  });
  dispatch(push("/company"));
};
