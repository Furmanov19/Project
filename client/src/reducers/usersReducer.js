import {
  USERS_LOADING,
  USERS_LOADED,
  USERS_LOADING_FAIL,
  SELECT_EXECUTOR_FOR_BOOKING,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAIL
} from "../actions/types";

const initialState = {
  isLoading: false,
  isLoaded: false,
  selectedExecutorForBooking: JSON.parse(localStorage.getItem('selectedExecutorForBooking')),
  users: [],
  orders:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USERS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USERS_LOADED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        users: action.payload
      };
    case SELECT_EXECUTOR_FOR_BOOKING:
      localStorage.setItem('selectedExecutorForBooking',JSON.stringify(action.payload));
      return {
        ...state,
        selectedExecutorForBooking: action.payload
      };
      case GET_USER_ORDERS_SUCCESS:
      return {
        ...state,
        orders:action.payload
      }
    case USERS_LOADING_FAIL:
    case GET_USER_ORDERS_FAIL:
      return {
        state: initialState
      };
    default:
      return state;
  }
}
