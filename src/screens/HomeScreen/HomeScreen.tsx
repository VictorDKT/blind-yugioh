import React, { useEffect, useState } from "react";
import { ScreenProps } from "../../types/ScreenProps";
import { Text, View } from "react-native";
import { downloadData } from "../../utils/downloadData";
import { setCardData } from "../../utils/cardDataManager";
import { CardInterface } from "../../types/CardInterface";
import * as FileSystem from "expo-file-system";
import { Button } from "../../components/Button/Button";
import styles from "./HomeScreenStyles";

export function HomeScreen(props: ScreenProps) {
  const [loading, setLoading] = useState(true);
  const fileUri = `${FileSystem.documentDirectory}data.json`;

  useEffect(() => {
    (async function () {
      const fileExists = await FileSystem.getInfoAsync(fileUri);

      if (!fileExists.exists) {
        setLoading(true);
        downloadData().then((response) => {
          setCardData(response as CardInterface[]);
          setLoading(false);
        });
      } else {
        setLoading(false);
        downloadData().then((response) => {
          setCardData(response as CardInterface[]);
        });
      }
    })();
  }, []);

  return (
    <View style={styles.page}>
      <Text style={styles.pageTitle}>Blind Yugioh</Text>
      {loading ? (
        <Text style={styles.loader}>Carregando...</Text>
      ) : (
        <View style={{ width: "100%" }}>
          <Button
            aditionalStyles={{ fontSize: 20 }}
            label={"Duelo"}
            accessibilityLabel={"Clique aqui para iniciar um duelo"}
            callback={() => {
              props.navigation.navigate("DuelConfigScreen");
            }}
          />
          <Button
            aditionalStyles={{ fontSize: 20 }}
            label={"Lista de cartas"}
            accessibilityLabel={"Clique aqui para ir para a lista de cartas"}
            callback={() => {
              props.navigation.navigate("ListScreen");
            }}
          />
          <Button
            aditionalStyles={{ fontSize: 20 }}
            label={"Leitor de cartas"}
            accessibilityLabel={"Clique aqui para ir para o scanner de cartas"}
            callback={() => {
              props.navigation.navigate("CardScannerScreen");
            }}
          />
        </View>
      )}
    </View>
  );
}
