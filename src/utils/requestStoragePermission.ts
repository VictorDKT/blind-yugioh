import { Platform, Alert } from "react-native";
import * as MediaLibrary from "expo-media-library";

export async function requestStoragePermission() {
  if (Platform.OS === "android") {
    try {
      if (Platform.Version >= 33) {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        return status === "granted";
      } else {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        return status === "granted";
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Permissão para acessar arquivos foi negada.");
      return false;
    }
  } else if (Platform.OS === "ios") {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      return status === "granted";
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Permissão para acessar a biblioteca de mídia foi negada.");
      return false;
    }
  }
  return false;
}