import React, { useCallback } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Todo } from "../../../App";
import { REACT_THEME_COLORS } from "../../settings";
import { AppText } from "../UI/AppText";

interface TodoComponentProps {
  todo: Todo;
  onRemove: (id: string) => void;
  onOpen: (id: string) => void;
}

export const TodoComponent: React.FC<TodoComponentProps> = ({
  todo,
  onRemove,
  onOpen,
}) => {
  const { id, title } = todo;

  const longPressHandler = useCallback(() => {
    onRemove(id);
  }, [id, onRemove]);

  const pressHandler = useCallback(() => {
    onOpen(id);
  }, [id, onOpen]);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onLongPress={longPressHandler}
      onPress={pressHandler}
    >
      <View style={styles.todo}>
        <AppText type="regular" style={styles.title}>
          {title}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todo: {
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: REACT_THEME_COLORS.blue,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: REACT_THEME_COLORS.darkest,
    fontSize: 18,
    // fontFamily: "roboto-bold",
  },
});
