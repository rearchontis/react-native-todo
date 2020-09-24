import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { REACT_THEME_COLORS } from "../../settings";
import { AppText } from "./AppText";

interface AppButtonProps {
  style?: Record<string, string | number>;
  onPress: (...args: any[]) => any;
}

export const AppButton: React.FC<AppButtonProps> = ({
  style,
  onPress,
  children,
}) => {
  const content = (
    <View style={[styles.button, style]}>
      <AppText>{children}</AppText>
    </View>
  );

  return Platform.OS === "android" ? (
    <TouchableNativeFeedback onPress={onPress}>
      {content}
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: REACT_THEME_COLORS.blue,
  },
});