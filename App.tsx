import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
// import * as Font from "expo-font";
import { AppLoading } from "expo";
import { StyleSheet, View, Dimensions, Alert } from "react-native";
import { Navbar } from "./src/components/Navbar/Navbar";
import { MainScreen } from "./src/screens/MainScreen";
import { TodoScreen } from "./src/screens/TodoScreen";
import useFonts from "./src/hooks/useFonts";
import { MAIN_SCREEN_PADDING_HORIZONTAL } from "./src/settings";

// async function loadApplication() {
//   await Font.loadAsync({
//     "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
//     "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
//   });
// }

export interface Todo {
  id: string;
  title: string;
}

const height = Dimensions.get("window").height;

const data = [
  { id: "1", title: "Learn React Native" },
  { id: "2", title: "Create an app" },
  { id: "3", title: "..." },
];

export default function App() {
  // const [isReady, setIsReady] = useState(false);
  const [fontsLoaded] = useFonts();

  const [todoId, setTodoId] = useState("");
  const [todos, setTodos] = useState<Todo[]>(data);

  const addTodo = useCallback((title: string) => {
    const id = Date.now().toString();
    const newTodo = { id, title };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }, []);

  const removeTodo = useCallback(
    (id: string) => {
      const selectedTodo = todos.find((todo) => todo.id === id);

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
              setTodoId("");
              setTodos((prevTodos) =>
                prevTodos.filter((todo) => todo.id !== id)
              );
            },
          },
        ],
        { cancelable: false }
      );
    },
    [todos, setTodos]
  );

  const updateTodo = useCallback((id, title) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          todo.title = title;
        }
        return todo;
      })
    );
  }, []);

  const openTodoHandler = useCallback(
    (id: string) => {
      setTodoId(id);
    },
    [setTodoId]
  );

  const goToMainScreenHandler = useCallback(() => setTodoId(""), []);

  let content = (
    <MainScreen
      addTodo={addTodo}
      todos={todos}
      removeTodo={removeTodo}
      openTodo={openTodoHandler}
    />
  );

  if (todoId.trim().length > 0) {
    const selectedTodo = todos.find((todo) => todo.id === todoId);

    if (selectedTodo) {
      content = (
        <TodoScreen
          onRemove={removeTodo}
          goBack={goToMainScreenHandler}
          todo={selectedTodo}
          onSave={updateTodo}
        />
      );
    }
  }

  // if (!isReady) {
  //   return (
  //     <AppLoading
  //       startAsync={loadApplication}
  //       onError={(error) => console.error(error)}
  //       onFinish={() => setIsReady(true)}
  //     />
  //   );
  // }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.body}>
      <StatusBar style="light" />
      <Navbar title={"Simple ToDo Application"} />
      <View style={styles.container}>{content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#282c34",
  },
  container: {
    paddingHorizontal: MAIN_SCREEN_PADDING_HORIZONTAL,
    paddingVertical: 20,
    height,
  },
});
