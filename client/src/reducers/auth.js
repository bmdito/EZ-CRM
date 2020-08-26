import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from "../actions/types";

//just like set alert we want an initial state
// we will get the initial state of the token from local storage
const initialState = {
  token: localStorage.getItem("token"),
  // start isAuth as null but will be set to true once logged in
  isAuthenticated: null,
  //once we make req get response loading will be set to false
  loading: true,
  //when we make a req to backend api/auth and get userdata, user data will be inserted here
  user: null,
};

export default function (state = initialState, action) {
  //destruture
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
