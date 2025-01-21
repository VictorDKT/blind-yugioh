import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./ButtonStyles";

interface IButtonProps {
    callback: ()=>void;
    label: string;
    accessibilityLabel: string;
    customClassName?: string;
    customTextClassName?: string;
    aditionalStyles?: Record<string, unknown>,
}

export function Button(props: IButtonProps) {
    return (
      <TouchableOpacity
        style={props.aditionalStyles ? {...styles[props.customClassName ? props.customClassName : "cardButton"], ...props.aditionalStyles} : styles[props.customClassName ? props.customClassName : "cardButton"]}
        accessibilityLabel={props.accessibilityLabel}
        onPress={props.callback}
      >
        <Text style={props.customTextClassName ? styles[props.customTextClassName] : styles.cardButtonText}>{props.label}</Text>
      </TouchableOpacity>
  );
}
