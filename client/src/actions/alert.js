// uuid npm creates random universal id
import { v4 as uuidv4 } from "uuid";

//we import these so we can dispatch them which will call the case we put in the reducer
import { SET_ALERT, REMOVE_ALERT } from "./types";

//since we may want to dispatch more than one alert we use dispatch below, which we have acess to from the 'thunk' middleware
export const setAlert = (msg, alertType) => (dispatch) => {
  //we will use uuid npm package to generate a random universal id
  const id = uuidv4(); // creates random long string
  dispatch({
    // we want to call SETALERT on our reducer/index so we dispatch an object with type setAlert and a payload
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
  // set time out to delete alert after 5 seconds
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};
