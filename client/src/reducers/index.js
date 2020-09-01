import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";

//combineReducers takes in an object of any reducers we create
export default combineReducers({
  alert,
  auth,
  profile,
});
