import isEmpty from "../validation/isEmpty";
import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    //state is immutable, take the payload from the action, and put it in the user object, then add it to the state
    // case XX:
    //   return {
    //     ...state,
    //     user: state.user
    //   };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
