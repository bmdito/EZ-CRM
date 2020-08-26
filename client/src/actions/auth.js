import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";
import { setAlert } from "./alert";

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
