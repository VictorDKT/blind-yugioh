import React, { useState } from "react";
import { View, Text, AccessibilityInfo } from "react-native";
import { ScreenProps } from "../../types/ScreenProps";
import styles from "./DuelConfigScreenStyles";
import { Button } from "../../components/Button/Button";
import { AccessibleTextInput } from "../../components/AccessibleTextInput/AccessibleTextInput";
import { formatArrayToSentence } from "../../utils/formatArrayToSentence";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function DuelConfigScreen(props: ScreenProps) {
    const [duelData, setDuelData] = useState<Record<string, string>>({
        player1Name: "Jogador 1",
        player2Name: "Jogador 2",
        initialLp: "8000",
    });

  return (
    <View style={styles.page}>
      <View style={styles.pageContainer}>
        <Button
          label={"Voltar"}
          accessibilityLabel={"Clique aqui para voltar ao menu principal"}
          callback={() => {
            props.navigation.goBack();
          }}
        />
        <Text style={styles.pageTitle}>Informações do duelo</Text>
        <AccessibleTextInput
          label={"Nome do jogador 1"}
          placeholder={"Insira o nome do primeiro jogador"}
          acessibilityLabel={"Digite o nome do primeiro jogador"}
          defaultValue={duelData.player1Name as string}
          callback={(value) => {
            const newDuelData = {...duelData};
            newDuelData["player1Name"] = value;
            setDuelData(newDuelData);
          }}
        />
        <AccessibleTextInput
          label={"Nome do jogador 2"}
          type={"number"}
          placeholder={"Insira o nome do segundo jogador"}
          acessibilityLabel={"Digite o nome do segundo jogador"}
          defaultValue={duelData.player2Name as string}
          callback={(value) => {
            const newDuelData = {...duelData};
            newDuelData["player2Name"] = value;
            setDuelData(newDuelData);
          }}
        />
        <AccessibleTextInput
          label={"Pontos de vida iniciais"}
          placeholder={"Insira a quantidade de pontos de vida inicial"}
          acessibilityLabel={"Digite a quantidade de pontos de vida inicial"}
          defaultValue={duelData.initialLp as string}
          callback={(value) => {
            const newDuelData = {...duelData};
            newDuelData["initialLp"] = value;
            setDuelData(newDuelData);
          }}
        />
        <Button
          label={"Iniciar duelo"}
          accessibilityLabel={"Clique aqui para iniciar o duelo"}
          callback={() => {
            const missingFields: string[] = [];
            const fieldsNameMap: Record<string, string> = {
                player1Name: "Nome do jogador 1",
                player2Name: "Nome do jogador 2",
                initialLp: "Pontos de vida iniciais",
            };

            Object.keys(duelData).forEach(key=>{
                if(!duelData[key] || (duelData[key] && duelData[key].length === 0)) {
                    missingFields.push(fieldsNameMap[key]);
                }
            });

            if(missingFields.length > 0) {
                AccessibilityInfo.announceForAccessibility("Os campos " + formatArrayToSentence(missingFields)+" não foram informados. Por favor insira as informações e tente novamente.");
            } else {
                AsyncStorage.setItem("duelData", JSON.stringify(duelData)).then(()=>{
                    props.navigation.navigate("DuelScreen");
                });
            }
          }}
        />
      </View>
    </View>
  );
}
