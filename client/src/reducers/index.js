import { combineReducers } from "redux";
import alert from "./alert.js";

//combineReducers takes in an object of any reducers we create
export default combineReducers({
  alert,
});
