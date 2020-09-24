import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../actionTypes";
import { ScreenContext } from "../screen/screenContext";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";

export const initialState = {
  todos: [
    { id: "1", title: "Learn React Native" },
    { id: "2", title: "Create an app" },
    { id: "3", title: "Refactor" },
  ],
};

export const TodoState: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { changeScreen } = useContext(ScreenContext);

  const addTodo = (title: string) => dispatch({ type: ADD_TODO, title });

  const removeTodo = (id: string) => {
    const selectedTodo = state.todos.find((todo) => todo.id === id);
    Alert.alert(
      "Todo deleting",
      `Are you sure you want to delete "${selectedTodo?.title}" Todo?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "I am sure",
          style: "destructive",
          onPress: () => {
            changeScreen("");
            dispatch({ type: REMOVE_TODO, id });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const updateTodo = (title: string, id: string) => {
    return dispatch({ type: UPDATE_TODO, title, id });
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        removeTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
