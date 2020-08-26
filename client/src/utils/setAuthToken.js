//function that takes in token and if there add to headers, otherwise delete from headers{
//axios to create a global header
import axios from "axios";
const setAuthToken = (token) => {
  //if token in local storage we will set int in header using axios, otherwise we will remove the header
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
