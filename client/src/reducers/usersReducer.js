import {
  USERS_LOADING,
  USERS_LOADED,
  USERS_LOADING_FAIL,
  SELECT_EXECUTOR_FOR_BOOKING
} from "../actions/types";

const initialState = {
  isLoading: false,
  isLoaded: false,
  selectedExecutorForBooking: JSON.parse(localStorage.getItem('selectedExecutorForBooking')),
  users: []
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
    case USERS_LOADING_FAIL:
      return {
        state: initialState
      };
    default:
      return state;
  }
}
