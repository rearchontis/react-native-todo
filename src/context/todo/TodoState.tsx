import React, {
  createContext,
  useReducer,
  useContext,
  useCallback,
} from "react";
import { Alert } from "react-native";
import { API_URL } from "../../settings";
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from "../actionTypes";
import { TodoContextValues } from "../../types";
import { ScreenContext } from "../screen/ScreenState";
import { todoReducer } from "./todoReducer";
import { HTTP } from "../../http";

export const initialState = {
  todos: [],
  loading: false,
  error: "",
};

export const TodoContext = createContext(initialState as TodoContextValues);

export const TodoState: React.FC = React.memo(({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { changeScreen } = useContext(ScreenContext);

  const showLoader = useCallback(() => dispatch({ type: SHOW_LOADER }), []);
  const hideLoader = useCallback(() => dispatch({ type: HIDE_LOADER }), []);

  const showError = useCallback((error: string) => {
    dispatch({ type: SHOW_ERROR, error });
  }, []);
  const clearError = useCallback(() => dispatch({ type: CLEAR_ERROR }), []);

  const addTodo = useCallback(
    async (title: string) => {
      clearError();

      try {
        const data = await HTTP.post(API_URL + ".json", { title });
        dispatch({ type: ADD_TODO, title, id: data.name });
      } catch (error) {
        showError("Something went wrong");
      }
    },
    [clearError, showError]
  );

  const removeTodo = useCallback(
    (id: string) => {
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
            onPress: async () => {
              changeScreen("");
              await HTTP.delete(
                `https://react-native-todo-application.firebaseio.com/todos/${id}.json`
              );
              // await HTTP.delete(API_URL + `/${id}.json`);
              dispatch({ type: REMOVE_TODO, id });
            },
          },
        ],
        { cancelable: false }
      );
    },
    [changeScreen, state.todos]
  );

  const updateTodo = useCallback(
    async (title: string, id: string) => {
      try {
        await HTTP.patch(API_URL + `/${id}.json`, { title });
        dispatch({ type: UPDATE_TODO, title, id });
      } catch (error) {
        showError("Something went wrong: " + error);
      }
    },
    [showError]
  );

  const fetchTodos = useCallback(async () => {
    showLoader();
    clearError();
    try {
      const data = await HTTP.get(
        "https://react-native-todo-application.firebaseio.com/todos.json"
      );
      const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }));

      dispatch({ type: FETCH_TODOS, todos });
    } catch (error) {
      showError("Something went wrong: " + error);
    } finally {
      hideLoader();
    }
  }, [showError, clearError, showLoader, hideLoader]);

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
});
