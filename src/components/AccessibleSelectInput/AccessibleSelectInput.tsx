import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { IOption } from "../../types/IOption";
import styles from "./AccessibleSelectInputStyles";

interface IAccessibleSelectInputProps {
  callback: (value: string) => void;
  label: string;
  placeholder: string;
  accessibilityLabel: string;
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
        accessibilityLabel={props.accessibilityLabel}
      >
        <Picker
          style={styles.input}
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            props.callback(itemValue);
            setSelectedValue(itemValue)
          }}
        >
          <Picker.Item label={props.placeholder} value="" />
          {
            props.options.map(option=>{
              return (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              )
            })
          }
        </Picker>
      </View>
    </View>
  );
}
