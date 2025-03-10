import QRCode from "react-native-qrcode-svg";
import { Button } from "../../../components/Button/Button";
import { saveQRCodeImage } from "../../../utils/saveQrCodeImage";
import styles from "../ListScreenStyles";
import React, { View, Text, AccessibilityInfo } from "react-native";
import {
  cardAttributeMap,
  characteristicsMap,
  cardTypeMap,
} from "../../../utils/consts";
import { CardInterface } from "../../../types/CardInterface";
import ViewShot from "react-native-view-shot";
import { useState } from "react";

interface ICardBoxProps {
  entity: CardInterface;
  qrRefs: Record<string, any>;
}

export function CardBox(props: ICardBoxProps) {
  const [showAditionalInfos, setShowAditionalInfos] = useState(false);

  if (showAditionalInfos === false) {
    return (
      <View style={styles.cardDataContainer} key={props.entity.cardCode}>
        <Text style={styles.cardDataText}>Nome: {props.entity.name}</Text>
        <Button
          label={"Informações adicionais"}
          customClassName={"smallButton"}
          customTextClassName={"smallButtonText"}
          accessibilityLabel={"Mostrar informações adicionais da carta"}
          aditionalStyles={{ marginBottom: 0 }}
          callback={() => {
            setShowAditionalInfos(true);
          }}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.cardDataContainer} key={props.entity.cardCode}>
        <Text style={styles.cardDataText}>Nome: {props.entity.name}</Text>
        <Text style={styles.cardDataText}>
          {characteristicsMap[props.entity.characteriscs]
            ? characteristicsMap[props.entity.characteriscs]
            : props.entity.characteriscs}
        </Text>
        {props.entity.characteriscs.includes("Monster") && (
          <Text style={styles.cardDataText}>
            {props.entity.linkRate
              ? "Valor link"
              : props.entity.category === "xyz"
              ? "Classe"
              : "Nível"}
            :{" "}
            {props.entity.linkRate ? props.entity.linkRate : props.entity.level}
          </Text>
        )}
        {props.entity.category.includes("link") && (
            <Text style={styles.cardDataText}>
              {"Setas link: " + props.entity.linkMarkers}
            </Text>
        )}
        {props.entity.scale && (
          <Text style={styles.cardDataText}>
            {`Escala pêndulo: ${props.entity.scale}`}
          </Text>
        )}
        {props.entity.characteriscs.includes("Monster") && (
          <Text style={styles.cardDataText}>
            {`Atributo: ${
              cardAttributeMap[props.entity.attribute]
                ? cardAttributeMap[props.entity.attribute]
                : props.entity.attribute
            }`}
          </Text>
        )}
        <Text style={styles.cardDataText}>
          {`Tipo: ${
            cardTypeMap[props.entity.type]
              ? cardTypeMap[props.entity.type]
              : props.entity.type
          }`}
        </Text>
        {props.entity.characteriscs.includes("Monster") && (
          <Text style={styles.cardDataText}>
            {"Ataque: " + props.entity.atk}
          </Text>
        )}
        {props.entity.characteriscs.includes("Monster") && props.entity.category !== "link" && (
            <Text style={styles.cardDataText}>
              {"Defesa: " + props.entity.def}
            </Text>
        )}
        <ViewShot
          ref={(ref) => (props.qrRefs.current[props.entity.cardCode] = ref)}
          style={styles.qrCodeContainer}
        >
          <QRCode
            value={props.entity.cardCode}
            size={200}
            color="black"
            backgroundColor="white"
          />
        </ViewShot>
        <Button
          label={"Texto da carta"}
          customClassName={"smallButton"}
          customTextClassName={"smallButtonText"}
          accessibilityLabel={"Ouvir o texto da carta"}
          callback={() => {
            AccessibilityInfo.announceForAccessibility(
              props.entity.description
            );
          }}
        />
        <Button
          label={"Gerar QR Code"}
          customClassName={"smallButton"}
          customTextClassName={"smallButtonText"}
          accessibilityLabel={"Gerar o QR Code da carta"}
          callback={() => {
            saveQRCodeImage(
              props.qrRefs.current[props.entity.cardCode],
              props.entity.name
            );
          }}
        />
        <Button
          label={"Fechar informações"}
          customClassName={"smallButton"}
          customTextClassName={"smallButtonText"}
          accessibilityLabel={"Ocultar informações adicionais da carta"}
          aditionalStyles={{ marginBottom: 0 }}
          callback={() => {
            setShowAditionalInfos(false);
          }}
        />
      </View>
    );
  }
}
