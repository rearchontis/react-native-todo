import { createContext } from "react";
import { initialState } from "./TodoState";
import { TodoContextValues } from "../../types";

export const TodoContext = createContext(initialState as TodoContextValues);
