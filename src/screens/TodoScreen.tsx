import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useCallback } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Todo } from "../../App";
import { EditModal } from "../components/EditModal/EditModal";
import { AppButton } from "../components/UI/AppButton";
import { AppCard } from "../components/UI/AppCard";
import { AppText } from "../components/UI/AppText";
import { REACT_THEME_COLORS } from "../settings";

interface TodoScreenProps {
  onRemove: (id: string) => void;
  goBack: () => void;
  todo: Todo;
  onSave: (id: string, title: string) => void;
}

export const TodoScreen: React.FC<TodoScreenProps> = ({
  onRemove,
  goBack,
  todo,
  onSave,
}) => {
  const [modal, setModal] = useState<boolean>(false);

  const { title, id } = todo;

  const onSaveHandler = (editedTitle: string) => {
    onSave(id, editedTitle);
    setModal(false);
  };

  const onRemoveHandler = useCallback(() => {
    onRemove(id);
  }, [id, onRemove]);

  return (
    <View>
      <EditModal
        value={title}
        visible={modal}
        onCancel={() => setModal(false)}
        onSaveHandler={onSaveHandler}
      />

      <AppCard style={styles.card}>
        <AppText type="regular" style={styles.title}>
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
            onPress={goBack}
          >
            <MaterialIcons name="keyboard-backspace" size={24} color="black" />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            style={{ backgroundColor: REACT_THEME_COLORS.red }}
            onPress={onRemoveHandler}
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
