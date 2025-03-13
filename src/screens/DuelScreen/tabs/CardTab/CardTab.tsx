import React, { useEffect, useState } from "react";
import { AccessibilityInfo, Dimensions, Text, View } from "react-native";
import { getCardByCode } from "../../../../utils/getCardByCode";
import { CardInterface } from "../../../../types/CardInterface";
import {
  cardAttributeMap,
  characteristicsMap,
  cardTypeMap,
} from "../../../../utils/consts";
import { Camera, CameraView } from "expo-camera";
import { Button } from "../../../../components/Button/Button";
import styles from "./CarTabStyles";
import { AccessibleSpinner } from "../../../../components/LoadSpinner/LoadSpinner";

interface CardTab {
  setTab: (value: string) => void;
  scanned: boolean;
  setScanned: (value: boolean) => void;
}

export function CardTab(props: CardTab) {
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [entity, setEntity] = useState<CardInterface | null>();
  const [code, setCode] = useState<string | null>();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  
  useEffect(()=>{
    if(code) {
      AccessibilityInfo.announceForAccessibility("Carta escaneada com sucesso.");
      getCardByCode(code as string).then((card) => {
        setEntity(card);
        props.setScanned(true);
        props.setTab("cardData");
        setCode(null);
        setLoading(false);
      });
    }
  }, [code])

  useEffect(()=>{
    if(props.scanned === false) {
      setCode(null);
      setEntity(null);
    }
  }, [props.scanned])

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  if(loading) {
    return (
      <View style={{width: screenWidth, height: screenHeight, position: "absolute"}}>
        {loading && <AccessibleSpinner accessibilityLabel={"Aguarde enquanto as informações da carta são carregadas."} />}
      </View>
    )
  }

  if (hasPermission === null || hasPermission === false) {
    return (
      <View>
        <Text>
          Para scannear uma carta é necessário permitir que o aplicativo acesse
          sua câmera
        </Text>
        <Button
          label={"Conceder permissão"}
          accessibilityLabel={
            "Clique aqui para permitir que o aplicativo acesse sua câmera"
          }
          callback={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
          }}
        />
      </View>
    );
  }

  return (
    <View>
      {props.scanned && entity ? (
        <View style={styles.cardDataContainer}>
          <Button
            label={"Nome"}
            accessibilityLabel={"Clique aqui para ouvir o nome da carta"}
            callback={() => {
              AccessibilityInfo.announceForAccessibility(entity.name);
            }}
          />
          <Button
            label={"Características gerais"}
            accessibilityLabel={
              "Clique aqui para ouvir as características gerais da carta"
            }
            callback={() => {
              AccessibilityInfo.announceForAccessibility(
                characteristicsMap[entity.characteriscs]
                  ? characteristicsMap[entity.characteriscs]
                  : entity.characteriscs
              );
            }}
          />
          {entity.characteriscs.includes("Monster") && (
            <Button
              label={
                entity.linkRate
                  ? "Valor link"
                  : entity.category === "xyz"
                  ? "Classe"
                  : "Nível"
              }
              accessibilityLabel={`Clique aqui para ouvir o ${
                entity.linkRate
                  ? "valor link"
                  : entity.category === "xyz"
                  ? "classe"
                  : "nível"
              } da carta`}
              callback={() => {
                AccessibilityInfo.announceForAccessibility(
                  entity.linkRate
                    ? (entity.linkRate as string)
                    : (entity.level as string)
                );
              }}
            />
          )}
          {entity.category.includes("link") && 
            <Button
              label={"Setas link"}
              accessibilityLabel={"Clique aqui para ouvir as setas link da carta"}
              callback={() => {
                AccessibilityInfo.announceForAccessibility(entity.linkMarkers as string);
              }}
            />
          }
          {entity.scale && 
            <Button
              label={"Escala pêndulo"}
              accessibilityLabel={"Clique aqui para ouvir a escala pêndulo da carta"}
              callback={() => {
                AccessibilityInfo.announceForAccessibility(entity.scale as string);
              }}
            />
          }
          {entity.characteriscs.includes("Monster") && (
            <Button
              label={"Atributo"}
              accessibilityLabel={"Clique aqui para ouvir o atributo da carta"}
              callback={() => {
                AccessibilityInfo.announceForAccessibility(
                  cardAttributeMap[entity.attribute]
                    ? cardAttributeMap[entity.attribute]
                    : entity.attribute
                );
              }}
            />
          )}
          <Button
            label={"Tipo"}
            accessibilityLabel={"Clique aqui para ouvir o tipo da carta"}
            callback={() => {
              AccessibilityInfo.announceForAccessibility(
                cardTypeMap[entity.type]
                  ? cardTypeMap[entity.type]
                  : entity.type
              );
            }}
          />
          <Button
            label={"Texto da carta"}
            accessibilityLabel={"Clique aqui para ouvir o texto da carta"}
            callback={() => {
              AccessibilityInfo.announceForAccessibility(entity.description);
            }}
          />
          {entity.characteriscs.includes("Monster") && (
            <Button
              label={"Ataque"}
              accessibilityLabel={"Clique aqui para ouvir o ataque da carta"}
              callback={() => {
                AccessibilityInfo.announceForAccessibility(
                  entity.atk as string
                );
              }}
            />
          )}
          {entity.characteriscs.includes("Monster") && entity.category !== "link" && (
            <Button
              label={"Defesa"}
              accessibilityLabel={"Clique aqui para ouvir a defesa da carta"}
              callback={() => {
                AccessibilityInfo.announceForAccessibility(
                  entity.def as string
                );
              }}
            />
          )}
        </View>
      ) : (
        <View style={{ height: 400, width: "100%" }}>
          <Text style={styles.cardDataText}>
            Aponte a câmera para a parte frontal da carta e aguarde alguns segundos para escanear a carta
          </Text>
          <CameraView
            accessibilityLabel={"Leitor de QR Code. Aponte a câmera para o código."}
            style={{ width: "100%", flex: 1 }}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
            onBarcodeScanned={
              props.scanned
                ? undefined
                : ({ type, data }) => {
                    setLoading(true);
                    setCode(data);
                  }
            }
          />
        </View>
      )}
    </View>
  );
}
