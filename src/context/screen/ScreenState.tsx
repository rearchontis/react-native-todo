import React, { useReducer } from "react";
import { CHANGE_SCREEN } from "../actionTypes";
import { ScreenContext } from "./screenContext";
import { screenReducer } from "./screenReducer";

export const ScreenState: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(screenReducer, "");

  const changeScreen = (id: string) => {
    dispatch({ type: CHANGE_SCREEN, payload: id });
  };

  return (
    <ScreenContext.Provider
      value={{
        changeScreen,
        todoId: state,
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
};
