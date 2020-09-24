import React from "react";
import { Text, StyleSheet } from "react-native";

interface AppTextProps {
  type?: "regular" | "italic" | "bold" | "boldItalic";
  style?: Record<string, string | number>;
}

export const AppText: React.FC<AppTextProps> = ({
  type = "regular",
  style = {},
  children,
}) => <Text style={[styles[type], style]}>{children}</Text>;

const styles = StyleSheet.create({
  regular: { fontFamily: "Roboto_400Regular" },
  italic: { fontFamily: "Roboto_400Regular_Italic" },
  bold: { fontFamily: "Roboto_700Bold" },
  boldItalic: { fontFamily: "Roboto_700Bold_Italic" },
});
