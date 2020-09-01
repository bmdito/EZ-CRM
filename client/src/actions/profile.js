import axios from "axios";
import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR } from "./types";

//get currrent user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    // dont have to pass in id, it knows what profile to load from token we sent with userid
    const res = await axios.get("/api/profile/me");

    //route returns all the profile data
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
