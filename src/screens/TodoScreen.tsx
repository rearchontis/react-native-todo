import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { EditModal } from "../components/EditModal/EditModal";
import { AppButton } from "../components/UI/AppButton";
import { AppCard } from "../components/UI/AppCard";
import { AppText } from "../components/UI/AppText";
import { REACT_THEME_COLORS } from "../settings";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";
import { Todo } from "../types";

export const TodoScreen: React.FC = () => {
  const { todos, updateTodo, removeTodo } = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext);

  const todo = todos.find((seekTodo) => seekTodo.id === todoId) as Todo;

  const [modal, setModal] = useState<boolean>(false);

  const { title, id } = todo;

  const onSaveHandler = async (editedTitle: string) => {
    if (updateTodo) {
      await updateTodo(editedTitle, id);
    }
    setModal(false);
  };

  const onRemoveTodoHandler = (_id: string) => {
    if (removeTodo) {
      removeTodo(_id);
    }
  };

  return (
    <View>
      <EditModal
        value={title}
        visible={modal}
        onCancel={() => setModal(false)}
        onSaveHandler={onSaveHandler}
      />

      <AppCard style={styles.card}>
        <AppText type="cabin-sketch-regular" style={styles.title}>
          {title}
        </AppText>
        <AppButton
          style={{ backgroundColor: REACT_THEME_COLORS.white }}
          onPress={() => setModal(true)}
        >
          <MaterialIcons name="edit" size={24} color="black" />
        </AppButton>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton
            style={{ backgroundColor: REACT_THEME_COLORS.lightgrey }}
            onPress={() => changeScreen("")}
          >
            <MaterialIcons name="keyboard-backspace" size={24} color="black" />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            style={{ backgroundColor: REACT_THEME_COLORS.red }}
            onPress={() => onRemoveTodoHandler(todo.id)}
          >
            <MaterialIcons name="delete" size={24} color="black" />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: Dimensions.get("window").width * 0.33,
  },
  title: {
    fontSize: 20,
    color: REACT_THEME_COLORS.red,
  },
  card: {
    marginBottom: 20,
  },
});
