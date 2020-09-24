import React from "react";
import { Text, StyleSheet } from "react-native";
import { AppTextProps } from "../../types";

export const AppText: React.FC<AppTextProps> = ({
  type = "neucha",
  style = {},
  children,
}) => <Text style={[styles[type], style]}>{children}</Text>;

const styles = StyleSheet.create({
  neucha: {
    fontFamily: "neucha-regular",
  },
  "cabin-sketch-regular": {
    fontFamily: "cabin-sketch-regular",
  },
  "cabin-sketch-bold": {
    fontFamily: "cabin-sketch-bold",
  },
});
