import React, { useEffect, useState } from "react";
import { View, TextInput, Text } from "react-native";
import styles from "./AccessibleTextInputStyles";

interface IAccessibleTextInputProps {
  callback: (value: string) => void;
  label: string;
  placeholder: string;
  acessibilityLabel: string;
  type?: "text" | "number";
  defaultValue?: string;
}

export function AccessibleTextInput(props: IAccessibleTextInputProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (props.defaultValue) {
      setValue(props.defaultValue);
    }
  }, [props.defaultValue]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}:</Text>
      <TextInput
        keyboardType={props.type === "number" ? "numeric" : "default"}
        style={styles.input}
        placeholder={props.placeholder}
        placeholderTextColor="#000000"
        value={value}
        onChangeText={(value) => {
          props.callback(value);
          setValue(value);
        }}
      />
    </View>
  );
}
