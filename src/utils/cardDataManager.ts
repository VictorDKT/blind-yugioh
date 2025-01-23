import { CardInterface } from "../types/CardInterface";
import * as FileSystem from "expo-file-system";
const fileUri = `${FileSystem.documentDirectory}data.json`;

export async function setCardData(data: CardInterface[]) {
  try {
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
    console.log("Dados salvos com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar os dados:", error);
  }
}

export async function getCardData() {
  try {
    const data = await FileSystem.readAsStringAsync(fileUri);

    return JSON.parse(data);
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
}
