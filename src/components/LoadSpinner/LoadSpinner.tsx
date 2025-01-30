import React from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "./LoadSpinnerStyles";

interface IAccessibleSpinnerProps {
    accessibilityLabel: string;
}

export function AccessibleSpinner(props: IAccessibleSpinnerProps) {
  return (
    <View 
        style={styles.loader}
        accessibilityLabel={props.accessibilityLabel}
    >
        <ActivityIndicator size="large" color="red" />
    </View>
  );
};