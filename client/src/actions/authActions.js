import axios from "axios";
import { returnErrors, clearErrors } from "./errorActions";
import { push } from "connected-react-router";
import { tokenConfig } from "./tokenConfig";
import {
  ADMIN_LOADING,
  ADMIN_LOADED,
  ADMIN_LOADING_FAIL,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  USER_LOADING,
  USER_LOADED,
  USER_LOADING_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_CONFIRM_SUCCESS,
  USER_REGISTER_CONFIRM_FAIL,
  REDIRECT_BLOCKED_USER,
  EXECUTOR_LOADING,
  EXECUTOR_LOADED,
  EXECUTOR_LOADING_FAIL,
  EXECUTOR_LOGIN_SUCCESS,
  EXECUTOR_LOGIN_FAIL,
  EXECUTOR_REGISTER_SUCCESS,
  EXECUTOR_REGISTER_FAIL,
  EXECUTOR_REGISTER_CONFIRM_SUCCESS,
  EXECUTOR_REGISTER_CONFIRM_FAIL,
  REDIRECT_BLOCKED_EXECUTOR,
  LOGOUT_SUCCESS,
  EDIT_USER,
  EDIT_USER_FAIL,
  EDIT_EXECUTOR,
  EDIT_EXECUTOR_FAIL,
  AUTH_ERROR
} from "./types";

// check token & load admin
export const loadAdmin = () => (dispatch, getState) => {
  //user loading
  dispatch({ type: ADMIN_LOADING });

  axios
    .get("admins/current", tokenConfig(getState))
    .then(res => {
      dispatch(clearErrors());
      dispatch({
        type: ADMIN_LOADED,
        payload: res.data
      });
    })
    .then(() => {
      dispatch(push("/profile"));
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: ADMIN_LOADING_FAIL });
    });
};

//register admin
export const registerAdmin = ({ name, password }) => dispatch => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //request body
  const body = JSON.stringify({
    name,
    password
  });

  axios
    .post("admins/register", body, config)
    .then(res => {
      dispatch(clearErrors());
      dispatch({
        type: ADMIN_REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "ADMIN_REGISTER_FAIL"
        )
      );
      dispatch({
        type: ADMIN_REGISTER_FAIL
      });
    });
};

export const loginAdmin = obj => dispatch => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  axios
    .post("admins/signin", obj, config)
    .then(res => {
      dispatch(clearErrors());
      dispatch({
        type: ADMIN_LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .then(() => {
      dispatch(push("/profile"));
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "ADMIN_LOGIN_FAIL")
      );
      dispatch({
        type: ADMIN_LOGIN_FAIL
      });
    });
};

// check token & load user
export const loadUser = () => (dispatch, getState) => {
  //user loading
  dispatch({ type: USER_LOADING });

  axios
    .get("users/current", tokenConfig(getState))
    .then(res => {
      dispatch(clearErrors());
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .then(() => {
      dispatch(push("/profile"));
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: USER_LOADING_FAIL });
    });
};

//register user
export const registerUser = ({ name, email, phone, password }) => dispatch => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //request body
  const body = JSON.stringify({
    name,
    email,
    phone,
    password
  });

  axios
    .post("users/register", body, config)
    .then(res => {
      dispatch(clearErrors());
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "USER_REGISTER_FAIL"
        )
      );
      dispatch({
        type: USER_REGISTER_FAIL
      });
    });
};
export const editUser = ({ name, phone, password }) => (dispatch, getState) => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const _id = getState().auth.user._id;
  //request body
  const body = JSON.stringify({
    name,
    phone,
    password
  });

  axios
    .put(`users/edit/${_id}`, body, config)
    .then(res => {
      dispatch(clearErrors());
      dispatch({
        type: EDIT_USER,
        payload: res.data
      });
      dispatch(push("/profile"));
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(err.response.data, err.response.status, "EDIT_USER_FAIL")
      );
      dispatch({
        type: EDIT_USER_FAIL
      });
    });
};
export const registerConfirmUser = obj => dispatch => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  axios
    .post("users/register/confirm", obj, config)
    .then(res => {
      dispatch(clearErrors());
      dispatch({
        type: USER_REGISTER_CONFIRM_SUCCESS,
        payload: res.data
      });
    })
    .then(() => {
      dispatch(push("/profile"));
    })
    .catch(err => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "USER_REGISTER_CONFIRM_FAIL"
        )
      );
      dispatch({
        type: USER_REGISTER_CONFIRM_FAIL
      });
    });
};

export const loginUser = obj => dispatch => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  axios
    .post("users/signin", obj, config)
    .then(async res => {
      if (res.data.isBlocked) {
        await dispatch({ type: REDIRECT_BLOCKED_USER, payload: res.data });
        await dispatch(push("/user-blocked"));
      } else {
        await dispatch(clearErrors());
        await dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: res.data
        });
        await dispatch(push("/profile"));
      }
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "USER_LOGIN_FAIL")
      );
      dispatch({
        type: USER_LOGIN_FAIL
      });
    });
};

// check token & load executor
export const loadExecutor = () => (dispatch, getState) => {
  //executor loading
  dispatch({ type: EXECUTOR_LOADING });

  axios
    .get("executors/current", tokenConfig(getState))
    .then(res => {
      dispatch(clearErrors());
      dispatch({
        type: EXECUTOR_LOADED,
        payload: res.data
      });
    })
    .then(() => {
      dispatch(push("/profile"));
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: EXECUTOR_LOADING_FAIL });
    });
};

//register executor
export const registerExecutor = executor => dispatch => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //request body
  const body = JSON.stringify(executor);

  axios
    .post("executors/register", body, config)
    .then(res => {
      dispatch(clearErrors());
      dispatch({
        type: EXECUTOR_REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "EXECUTOR_REGISTER_FAIL"
        )
      );
      dispatch({
        type: EXECUTOR_REGISTER_FAIL
      });
    });
};
export const editExecutor = ({
  name,
  discription,
  password,
  services,
  address
}) => (dispatch, getState) => {
  const _id = getState().auth.executor._id;
  //request body
  const body = JSON.stringify({
    name,
    discription,
    password,
    services,
    address
  });

  axios
    .put(`executors/edit/${_id}`, body, tokenConfig(getState))
    .then(res => {
      dispatch(clearErrors());
      dispatch({
        type: EDIT_EXECUTOR,
        payload: res.data
      });
      dispatch(push("/profile"));
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "EDIT_EXECUTOR_FAIL"
        )
      );
      dispatch({
        type: EDIT_EXECUTOR_FAIL
      });
    });
};

export const registerConfirmExecutor = obj => dispatch => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  axios
    .post("executors/register/confirm", obj, config)
    .then(res => {
      dispatch(clearErrors());
      dispatch({
        type: EXECUTOR_REGISTER_CONFIRM_SUCCESS,
        payload: res.data
      });
    })
    .then(() => {
      dispatch(push("/profile"));
    })
    .catch(err => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "EXECUTOR_REGISTER_CONFIRM_FAIL"
        )
      );
      dispatch({
        type: EXECUTOR_REGISTER_CONFIRM_FAIL
      });
    });
};

export const loginExecutor = obj => dispatch => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  axios
    .post("executors/signin", obj, config)
    .then(async res => {
      if (res.data.isBlocked) {
        await dispatch({ type: REDIRECT_BLOCKED_EXECUTOR, payload: res.data });
        await dispatch(push("/executor-blocked"));
      } else {
        await dispatch(clearErrors());
        await dispatch({
          type: EXECUTOR_LOGIN_SUCCESS,
          payload: res.data
        });
        await dispatch(push("/profile"));
      }
    })
    .catch(err => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "EXECUTOR_LOGIN_FAIL"
        )
      );
      dispatch({
        type: EXECUTOR_LOGIN_FAIL
      });
    });
};

//logout user
export const logout = () => dispatch => {
  dispatch(push("/"));
  dispatch({ type: LOGOUT_SUCCESS });
};
