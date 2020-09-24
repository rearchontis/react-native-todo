import React, { useState } from "react";
import { View, TextInput, StyleSheet, Modal, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { REACT_THEME_COLORS } from "../../settings";
import { AppButton } from "../UI/AppButton";

interface EditModalProps {
  value: string;
  visible: boolean;
  onCancel: () => void;
  onSaveHandler: (editedTitle: string) => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  value,
  visible,
  onCancel,
  onSaveHandler,
}) => {
  const [title, setTitle] = useState(value);
  const saveHandler = () => {
    const symbols = title.trim().length;

    if (symbols < 3) {
      Alert.alert(
        "Error",
        `Min name length contains 3 symbols, now entered ${symbols} symbols`
      );
    } else {
      onSaveHandler(title);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.wrap}>
        <TextInput
          value={title}
          style={styles.input}
          onChangeText={setTitle}
          placeholder={"Enter the edited todo"}
          placeholderTextColor={REACT_THEME_COLORS.white}
          autoCapitalize={"sentences"}
          autoCorrect={false}
          maxLength={64}
        />
        <View style={styles.buttons}>
          <AppButton
            style={{ backgroundColor: REACT_THEME_COLORS.red }}
            onPress={onCancel}
          >
            <MaterialIcons name="cancel" size={24} color="black" />
          </AppButton>
          <AppButton
            style={{ backgroundColor: REACT_THEME_COLORS.green }}
            onPress={saveHandler}
          >
            <MaterialIcons name="save" size={24} color="black" />
          </AppButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: REACT_THEME_COLORS.dark,
  },
  input: {
    padding: 10,
    borderBottomColor: REACT_THEME_COLORS.white,
    borderBottomWidth: 1,
    width: "80%",
    fontSize: 16,
    color: REACT_THEME_COLORS.white,
  },
  buttons: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
