import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { REACT_THEME_COLORS } from "../../settings";

export const AppLoader = React.memo(() => (
  <View style={styles.center}>
    <ActivityIndicator size={"large"} color={REACT_THEME_COLORS.blue} />
  </View>
));

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
