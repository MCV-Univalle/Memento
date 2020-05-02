import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {clearErrors} from "./errorActions"
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  LOGIN_SUCCESS,
  USER_CHANGE,
  DELETE_USER_QUESTIONS,
  DELETE_USER_RELATIONS
} from "./types";


// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/user/create", userData)
    .then(res => history.push("/login-page")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get user token
export const loginUser = userData => dispatch => {
  return (axios
    .post("/user/login", userData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      dispatch(clearErrors)

      const { token } = res.data;
      const { user } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      dispatch(setUser(user));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
       })
    ));

};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// User success
export const setUser = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user
  };
};
// User change
export const changeUser = user => {
  return {
    type: USER_CHANGE,
    payload: user
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.clear()
  // Delete questions
  dispatch({
    type: DELETE_USER_QUESTIONS
   }) 
   // Delete relations
  dispatch({
    type: DELETE_USER_RELATIONS
   }) 
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};