import { _todoReducer, TodoState } from "../../types";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../actionTypes";

export const todoReducer: _todoReducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now().toString(),
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
    default:
      return state;
  }
};
