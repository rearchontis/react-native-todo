import React, { useState } from "react";
import { View, StyleSheet, TextInput, Alert, Keyboard } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { REACT_THEME_COLORS } from "../../settings";
import { AppButton } from "../UI/AppButton";

interface AddTodoProps {
  onSubmit: (title: string) => void;
}

export const AddTodo: React.FC<AddTodoProps> = ({ onSubmit }) => {
  const [value, setValue] = useState<string>("");

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue("");
      Keyboard.dismiss();
    } else {
      Alert.alert("Entered value shouldn't be empty");
    }
  };

  return (
    <View style={styles.block}>
      <TextInput
        value={value}
        autoCorrect={false}
        style={styles.input}
        onChangeText={setValue}
        autoCapitalize="sentences"
        placeholder="What's in your mind today?"
        placeholderTextColor={REACT_THEME_COLORS.grey}
      />
      <AppButton onPress={pressHandler}>
        <MaterialIcons
          name="add-circle"
          size={24}
          color={REACT_THEME_COLORS.dark}
        />
      </AppButton>
      {/* <TouchableOpacity style={styles.button} onPress={pressHandler}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "80%",
    padding: 10,
    fontSize: 14,
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: REACT_THEME_COLORS.blue,
    color: REACT_THEME_COLORS.dark,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: REACT_THEME_COLORS.blue,
  },
  buttonText: {
    fontSize: 28,
    color: REACT_THEME_COLORS.dark,
    textAlign: "center",
  },
});
