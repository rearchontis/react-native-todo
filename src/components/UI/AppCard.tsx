import React from "react";
import { View, StyleSheet } from "react-native";
import { REACT_THEME_COLORS } from "../../settings";

export const AppCard = React.memo((props: any) => {
  return (
    <View style={{ ...styles.default, ...props.style }}>{props.children}</View>
  );
});

const styles = StyleSheet.create({
  default: {
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: REACT_THEME_COLORS.darkest,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: REACT_THEME_COLORS.darkest,
    shadowRadius: 20,
  },
});
