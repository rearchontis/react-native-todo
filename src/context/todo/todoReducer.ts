import { _todoReducer, TodoState } from "../../types";
import {
  ADD_TODO,
  CLEAR_ERROR,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
  FETCH_TODOS,
} from "../actionTypes";

export const todoReducer: _todoReducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.id,
            title: action.title,
          },
        ],
      } as TodoState;
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      } as TodoState;
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.id) {
            todo.title = action.title ?? "";
          }
          return todo;
        }),
      } as TodoState;
    case SHOW_LOADER:
      return {
        ...state,
        loading: true,
      } as TodoState;
    case HIDE_LOADER:
      return {
        ...state,
        loading: false,
      } as TodoState;
    case CLEAR_ERROR:
      return {
        ...state,
        error: "",
      } as TodoState;
    case SHOW_ERROR: {
      return {
        ...state,
        error: action.error,
      } as TodoState;
    }
    case FETCH_TODOS:
      return {
        ...state,
        todos: action.todos,
      } as TodoState;
    default:
      return state;
  }
};
