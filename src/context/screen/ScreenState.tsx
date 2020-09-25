import React, { useCallback, useReducer } from "react";
import { CHANGE_SCREEN } from "../actionTypes";
import { screenReducer } from "./screenReducer";
import { createContext } from "react";
import { ScreenContextValues } from "../../types";

export const ScreenContext = createContext({} as ScreenContextValues);

export const ScreenState: React.FC = React.memo(({ children }) => {
  const [state, dispatch] = useReducer(screenReducer, "");

  const changeScreen = useCallback((id: string) => {
    dispatch({ type: CHANGE_SCREEN, payload: id });
  }, []);

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
});
