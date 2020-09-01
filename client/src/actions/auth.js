import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";
import { setAlert } from "./alert";

import setAuthToken from "../utils/setAuthToken";

//Load User
export const loadUser = () => async (dispatch) => {
  //check to see if token and if it is put it in a global header
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      //payload is the data sent from route which is user
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, name, password });

  try {
    const res = await axios.post("/api/users", body, config);

    //if we dont get an erro and post works:
    dispatch({
      type: REGISTER_SUCCESS,
      //payload is data we get back which is the token, on a successful response
      payload: res.data,
    });
  } catch (err) {
    // if theres an error we want to loop through errors array and using the imported alert action run our errors
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    //if we dont get an erro and post works:
    dispatch({
      type: LOGIN_SUCCESS,
      //payload is data we get back which is the token, on a successful response
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    // if theres an error we want to loop through errors array and using the imported alert action run our errors
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//logout // clear profile

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
