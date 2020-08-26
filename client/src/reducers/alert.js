import { SET_ALERT, REMOVE_ALERT } from "../actions/types";
// takes in an initial state and an action, which will be dispatched from an actions file
// enventually this array will be in array of objects, each with an id, a message, and an alertType, but the intial state will just be an empty array

const initialState = [];

// takes in state, which by default is initial state, and action.  The action will contain a type, and a payload which is the data
export default function (state = initialState, action) {
  //destructure so we can simply use type and payload instead of action.type and action.payload
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      //use spread opertator because if other alerts there we keep them
      return [...state, payload];
    case REMOVE_ALERT:
      //remove a specific alert by id
      //payload in this case is just the id, but can be anything
      // keep all alerts but the one matching the id
      return state.filter((alert) => alert.id !== payload);
    default:
      //default will always return state
      return state;
  }
}
