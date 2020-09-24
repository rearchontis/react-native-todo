import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";
import { Todo } from "../../App";
import { AddTodo } from "../components/AddTodo/AddTodo";
import { TodoComponent } from "../components/TodoComponent/TodoComponent";
import { MAIN_SCREEN_PADDING_HORIZONTAL } from "../settings";

interface MainScreenProps {
  addTodo: (title: string) => void;
  todos: Todo[];
  removeTodo: (id: string) => void;
  openTodo: (id: string) => void;
}

export const MainScreen: React.FC<MainScreenProps> = ({
  addTodo,
  todos,
  removeTodo,
  openTodo,
}) => {
  const width = () => {
    return Dimensions.get("window").width - MAIN_SCREEN_PADDING_HORIZONTAL * 2;
  };

  const [deviceWidth, setDeviceWidth] = useState(width());

  useEffect(() => {
    const update = () => setDeviceWidth(width());
    const subscribe = () => Dimensions.addEventListener("change", update);
    const unsubscribe = () => Dimensions.removeEventListener("change", update);

    subscribe();
    return () => unsubscribe();
  });

  let content = (
    <View style={[{ width: deviceWidth }]}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoComponent todo={item} onRemove={removeTodo} onOpen={openTodo} />
        )}
      />
    </View>
  );

  if (todos.length === 0) {
    content = (
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={require("../../assets/all-done.png")}
        />
      </View>
    );
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
