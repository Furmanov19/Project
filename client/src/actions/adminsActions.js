import axios from "axios";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./tokenConfig";

import {
  SELECT_EXECUTOR,
  BLOCK_EXECUTOR,
  UNBLOCK_EXECUTOR,
  BLOCK_EXECUTOR_FAIL,
  UNBLOCK_EXECUTOR_FAIL,
  SELECT_USER,
  BLOCK_USER,
  UNBLOCK_USER,
  BLOCK_USER_FAIL,
  UNBLOCK_USER_FAIL
} from "./types";

export const SelectExecutor = executorId => dispatch => {
  dispatch({
    type: SELECT_EXECUTOR,
    payload: executorId
  });
};

export const SelectUser = userId => dispatch => {
  dispatch({
    type: SELECT_USER,
    payload: userId
  });
};

export const blockExecutor = (executorId, reason) => (dispatch, getState) => {
  const body = JSON.stringify({
    reason
  });

  axios
    .put(`executors/block/${executorId}`, body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: BLOCK_EXECUTOR,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: BLOCK_EXECUTOR_FAIL });
    });
};

export const unblockExecutor = executorId => (dispatch, getState) => {
  axios
    .put(`executors/unblock/${executorId}`, {}, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: UNBLOCK_EXECUTOR,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: UNBLOCK_EXECUTOR_FAIL });
    });
};

export const blockUser = (userId, reason) => (dispatch, getState) => {
  const body = JSON.stringify({
    reason
  });

  axios
    .put(`users/block/${userId}`, body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: BLOCK_USER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: BLOCK_USER_FAIL });
    });
};

export const unblockUser = userId => (dispatch, getState) => {
  axios
    .put(`users/unblock/${userId}`, {}, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: UNBLOCK_USER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: UNBLOCK_USER_FAIL });
    });
};
