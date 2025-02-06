import { StatusBar } from "expo-status-bar";
import AppStack from "./src/routes/AppStack";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import "./gesture-handler";

export default function App() {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Carregando fontes</Text>;
  }

  if (error) {
    return <Text>{`${error.name} ${error.message}`}</Text>;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, width: "100%", height: "100%" }}>
      <SafeAreaView style={styles.safeArea}>
        <AppStack />
        <StatusBar style="light" />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 30 },
  safeArea: {
    position: "relative",
    flex: 1,
    backgroundColor: "red",
  },
});
