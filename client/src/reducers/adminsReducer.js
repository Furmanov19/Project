import {
  SELECT_EXECUTOR,
  BLOCK_EXECUTOR,
  UNBLOCK_EXECUTOR,
  SELECT_USER,
  BLOCK_USER,
  UNBLOCK_USER
} from "../actions/types";

const initialState = {
  selectedExecutor: JSON.parse(localStorage.getItem("selectedExecutor")),
  selectedUser: JSON.parse(localStorage.getItem("selectedUser"))
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_EXECUTOR:
      localStorage.setItem("selectedExecutor", JSON.stringify(action.payload));
      return {
        ...state,
        selectedExecutor: action.payload
      };
    case BLOCK_EXECUTOR:
      return {
        ...state,
        selectedExecutor: action.payload
      };
    case UNBLOCK_EXECUTOR:
      return {
        ...state,
        selectedExecutor: action.payload
      };
    case SELECT_USER:
      localStorage.setItem("selectedUser", JSON.stringify(action.payload));
      return {
        ...state,
        selectedUser: action.payload
      };
    case BLOCK_USER:
      return {
        ...state,
        selectedUser: action.payload
      };
    case UNBLOCK_USER:
      return {
        ...state,
        selectedUser: action.payload
      };
    default:
      return state;
  }
}
