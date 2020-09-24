import { _screenReducer } from "../../types";
import { CHANGE_SCREEN } from "../actionTypes";

export const screenReducer: _screenReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_SCREEN:
      return action.payload;
    default:
      return state;
  }
};
