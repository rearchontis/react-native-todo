import React, { useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Navbar } from "./components/Navbar/Navbar";
import { TodoScreen } from "./screens/TodoScreen";
import { MainScreen } from "./screens/MainScreen";
import { MAIN_SCREEN_PADDING_HORIZONTAL } from "./settings";
import { ScreenContext } from "./context/screen/screenContext";

const height = Dimensions.get("window").height;

export const MainLayout = () => {
  const { todoId } = useContext(ScreenContext);

  return (
    <View style={styles.body}>
      <StatusBar style="light" />
      <Navbar title={"Simple ToDo Application"} />
      <View style={styles.container}>
        {todoId ? <TodoScreen /> : <MainScreen />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  container: {
    paddingHorizontal: MAIN_SCREEN_PADDING_HORIZONTAL,
    paddingVertical: 20,
    flex: 1,
    height,
  },
});
