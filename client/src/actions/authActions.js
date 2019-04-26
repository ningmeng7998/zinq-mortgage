import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "../actions/types";
//Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    //If it is successful redirect to login
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );

  return {
    type: GET_ERRORS,
    payload: userData
  };
};

//Login - Get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //get token and save to localstorage
      const { token } = res.data;
      //Set token to local storage. Local storage only stores strings
      localStorage.setItem("jwtToken", token);
      //Set token to auth header

      setAuthToken(token);
      // Extract the user data from the Beare string  -- decode token to get user data
      const decoded = jwt_decode(token);
      //Set curent user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set logged in user
export const setCurrentUser = decoded => {
  //Dispatch to reducer
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log out user
export const logoutUser = () => dispatch => {
  //Remove token reom localstorage
  localStorage.removeItem("jwtToken");
  //remove auth header for future requests
  setAuthToken(false);
  //Set current user to an empty object, which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
