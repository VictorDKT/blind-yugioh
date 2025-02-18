import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Text, View } from "react-native";
import styles from "./LpTabStyles";
import { AccessibleSelectInput } from "../../../../components/AccessibleSelectInput/AccessibleSelectInput";
import { AccessibleTextInput } from "../../../../components/AccessibleTextInput/AccessibleTextInput";
import { Button } from "../../../../components/Button/Button";

interface ILpTabProps {
  duelData: Record<string, string>;
  setDuelData: (value: Record<string, string>) => void;
}

export function LpTab(props: ILpTabProps) {
  const [formData, setFormData] = useState({
    target: "player1Lp",
    operation: "decrease",
    quantity: 0,
  });

  return (
    <View>
      <Text style={styles.pageTitle}>Informações do duelo</Text>
      <Text style={styles.cardDataText}>
        {props.duelData.player1Name}: {props.duelData.player1Lp} pontos de vida
      </Text>
      <Text style={styles.cardDataText}>
        {props.duelData.player2Name}: {props.duelData.player2Lp} pontos de vida
      </Text>
      <Text style={styles.formDataText}>
        Prencha os dados abaixo para alterar os pontos de vida de um dos
        jogadores:
      </Text>
      <AccessibleSelectInput
        label={"Jogador"}
        placeholder={"Selecione uma opção"}
        accessibilityLabel={
          "Selecione o jogador ao qual deseja reduzir ou aumentar os pontos de vida"
        }
        defaultValue={"player1Lp"}
        options={[
          { label: props.duelData.player1Name, value: "player1Lp" },
          { label: props.duelData.player2Name, value: "player2Lp" },
        ]}
        callback={(value) => {
          const newFormData = { ...formData };
          newFormData.target = value;
          setFormData(newFormData);
        }}
      />
      <AccessibleTextInput
        label={"Quantidade"}
        placeholder={
          "Insira a quantidade de pontos de vida que deseja reduzir ou aumentar"
        }
        acessibilityLabel={
          "Digite a quantidade de pontos de vida que deseja reduzir ou aumentar"
        }
        defaultValue={
          !isNaN(formData.quantity) ? formData.quantity.toString() : undefined
        }
        type={"number"}
        callback={(value) => {
          const newFormData = { ...formData };
          newFormData.quantity = parseFloat(value);
          setFormData(newFormData);
        }}
      />
      <AccessibleSelectInput
        label={"Operação"}
        placeholder={"Selecione uma opção"}
        defaultValue={"decrease"}
        accessibilityLabel={
          "Selecione a operação que deseja realizar com os pontos de vida. Aumentar ou Reduzir."
        }
        options={[
          { label: "Aumentar", value: "increase" },
          { label: "Diminuir", value: "decrease" },
        ]}
        callback={(value) => {
          const newFormData = { ...formData };
          newFormData.operation = value;
          setFormData(newFormData);
        }}
      />
      <Button
        label={"Alterar"}
        accessibilityLabel={"Clique aqui para alterar os pontos de vida"}
        callback={() => {
          if (formData.quantity && !isNaN(formData.quantity)) {
            const newFormData = { ...formData };
            const newDuelData = { ...props.duelData };

            if (formData.operation === "increase") {
              newDuelData[formData.target] = (
                parseInt(newDuelData[formData.target]) + formData.quantity
              ).toString();
            } else {
              newDuelData[formData.target] = (
                parseInt(newDuelData[formData.target]) - formData.quantity
              ).toString();
            }

            newFormData.quantity = 0;

            AsyncStorage.setItem("duelData", JSON.stringify(newDuelData));
            setFormData(newFormData);
            props.setDuelData(newDuelData);
            AccessibilityInfo.announceForAccessibility(
              "Pontos de vida alterados com sucesso"
            );
          } else {
            AccessibilityInfo.announceForAccessibility(
              "Quantidade não informada. Insira a quantidade de pontos de vida e tente novamente"
            );
          }
        }}
      />
    </View>
  );
}
