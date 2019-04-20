import { history } from "../reducers";
import { goBack, push } from "connected-react-router";

export const goBackFanc = () => dispatch => {
  if (history.length > 0) {
    dispatch(goBack());
  } else {
    dispatch(push("/"));
  }
};
