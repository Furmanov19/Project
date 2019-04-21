import axios from "axios";
import { returnErrors } from "./errorActions";
import { push } from "connected-react-router";
import { tokenConfig } from "./tokenConfig";
import {
  USERS_LOADING,
  USERS_LOADED,
  USERS_LOADING_FAIL,
  SELECT_EXECUTOR_FOR_BOOKING,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAIL,
  GET_EXECUTOR_COMMENTS_SUCCESS,
  GET_EXECUTOR_COMMENTS_FAIL,
  POST_EXECUTOR_COMMENT_SUCCESS,
  POST_EXECUTOR_COMMENT_FAIL
} from "./types";

export const getUsers = () => (dispatch, getState) => {
  let offset = getState().search.offset;
  let search = getState().search.searchInput;

  dispatch({ type: USERS_LOADING });

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

export const getUserOrders = () => (dispatch, getState) => {
  let offset = getState().search.offset;

  axios
    .get(`orders?page=${++offset}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_USER_ORDERS_SUCCESS,
        payload: res.data
      });
      getState().search.offset = 0;
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: GET_USER_ORDERS_FAIL });
    });
};

export const selectExecutorForInfo = executorId => dispatch => {
  dispatch({
    type: SELECT_EXECUTOR_FOR_BOOKING,
    payload: executorId
  });
  dispatch(push("/company"));
};

export const createOrder = order => (dispatch, getState) => {
  let user = getState().auth.user;
  let isAuth = getState().auth.isAuthenticated;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(order);

  axios
    .post("orders/create", body, config)
    .then(res => {
      dispatch({ type: CREATE_ORDER_SUCCESS });
    })
    .then(res => {
      user && isAuth ? dispatch(push("/profile")) : dispatch(push("/"));
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: CREATE_ORDER_FAIL });
    });
};

export const getExecutorComments = perPage => (dispatch, getState) => {
  let executor_id = getState().users.selectedExecutorForBooking._id;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  axios
    .get(`executors/${executor_id}/comments?perPage=${perPage}`, config)
    .then(res => {
      dispatch({
        type: GET_EXECUTOR_COMMENTS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: GET_EXECUTOR_COMMENTS_FAIL });
    });
};

export const postComment = comment => (dispatch, getState) => {
  let executor_id = getState().users.selectedExecutorForBooking._id;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  axios
    .post(`executors/${executor_id}/comments`, comment, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: POST_EXECUTOR_COMMENT_SUCCESS,
        payload: res.data
      });
    })
    .then(res => {
      axios.get(`executors/${executor_id}/comments`, config).then(res => {
        dispatch({
          type: GET_EXECUTOR_COMMENTS_SUCCESS,
          payload: res.data
        });
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: POST_EXECUTOR_COMMENT_FAIL });
    });
};
