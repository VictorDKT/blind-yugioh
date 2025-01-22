import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScreenProps } from "../../types/ScreenProps";
import styles from "./DuelScreenStyles";
import { Button } from "../../components/Button/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function DuelScreen(props: ScreenProps) {
  const [tab, setTab] = useState("lp");
  const [duelData, setDuelData] = useState<Record<string, string>>({
    player1Name: "Jogador 1",
    player2Name: "Jogador 2",
    initialLp: "8000",
  });

  useEffect(()=>{
    (async function () {
      const duelData = JSON.parse(await AsyncStorage.getItem("duelData") as string);
      setDuelData(duelData);
    })()
  }, [])

  return (
    <View style={styles.page}>
      <View style={styles.pageContainer}>
        {tab === "lp" && <Button
          label={"Voltar"}
          accessibilityLabel={"Clique aqui para voltar ao menu principal"}
          callback={() => {
            props.navigation.navigate("HomeScreen");
          }}
        />}
        {tab === "cardScanner" || tab === "cardData" && <Button
          label={"Visualizar pontos de vida"}
          accessibilityLabel={"Clique aqui para ir à tela de pontos de vida"}
          callback={() => {
            setTab("lp");
          }}
        />}
        {tab === "lp" || tab === "cardData" && <Button
          label={tab === "cardData" ? "Ler outra carta" : "Ler uma carta"}
          accessibilityLabel={"Clique aqui para ir à tela de leitura de cartas"}
          callback={() => {
            setTab("cardScanner");
          }}
        />}
      </View>
    </View>
  );
}
