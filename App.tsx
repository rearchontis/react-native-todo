import React, { useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import { MainLayout } from "./src/MainLayout";
import { TodoState } from "./src/context/todo/TodoState";
import { ScreenState } from "./src/context/screen/ScreenState";

async function loadApplication() {
  await Font.loadAsync({
    "neucha-regular": require("./assets/fonts/Neucha-Regular.ttf"),
    "cabin-sketch-regular": require("./assets/fonts/CabinSketch-Regular.ttf"),
    "cabin-sketch-bold": require("./assets/fonts/CabinSketch-Bold.ttf"),
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={(err) => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  return (
    <ScreenState>
      <TodoState>
        <MainLayout />
      </TodoState>
    </ScreenState>
  );
}
