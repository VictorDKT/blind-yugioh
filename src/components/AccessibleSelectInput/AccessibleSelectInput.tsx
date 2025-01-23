import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { IOption } from "../../types/IOption";
import styles from "./AccessibleSelectInputStyles";

interface IAccessibleSelectInputProps {
  callback: (value: string) => void;
  label: string;
  placeholder: string;
  acessibilityLabel: string;
  options: IOption[];
  defaultValue?: string;
}

export function AccessibleSelectInput(props: IAccessibleSelectInputProps) {
  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    if (props.defaultValue) {
      setSelectedValue(props.defaultValue);
    }
  }, [props.defaultValue]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}:</Text>
      <View
        style={styles.selectContainer}
        accessibilityLabel={props.acessibilityLabel}
      >
        <RNPickerSelect
          items={props.options}
          style={styles.input}
          useNativeAndroidPickerStyle={false}
          value={selectedValue}
          placeholder={{
            label: props.placeholder,
            value: "",
          }}
          onValueChange={(value: string) => {
            setSelectedValue(value);
            props.callback(value);
          }}
        />
      </View>
    </View>
  );
}
