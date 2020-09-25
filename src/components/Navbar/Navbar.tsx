import * as React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { REACT_THEME_COLORS } from "../../settings";
import { AppText } from "../UI/AppText";
import { NavbarProps } from "../../types";

export const Navbar: React.FC<NavbarProps> = React.memo(({ title }) => {
  return (
    <View style={styles.navbar}>
      <AppText type="cabin-sketch-bold" style={styles.text}>
        {title}
      </AppText>
    </View>
  );
});

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10,
    ...Platform.select({
      ios: {
        borderBottomColor: REACT_THEME_COLORS.darkest,
        borderBottomWidth: 1,
      },
      android: {
        backgroundColor: REACT_THEME_COLORS.darkest,
      },
    }),
  },
  text: {
    fontSize: 20,
    ...Platform.select({
      ios: {
        color: REACT_THEME_COLORS.darkest,
      },
      android: {
        color: REACT_THEME_COLORS.blue,
      },
    }),
  },
});
