import React, { useEffect, useRef, useState } from "react";
import { ScreenProps } from "../../types/ScreenProps";
import { AccessibilityInfo, Text, View } from "react-native";
import { getCardByCode } from "../../utils/getCardByCode";
import { CardInterface } from "../../types/CardInterface";
import {
  cardAttributeMap,
  cardFrameMap,
  cardTypeMap,
} from "../../utils/consts";
import ViewShot from "react-native-view-shot";
import QRCode from "react-native-qrcode-svg";
import { saveQRCodeImage } from "../../utils/saveQrCodeImage";
import { Camera, CameraView } from "expo-camera";
import { Button } from "../../components/Button/Button";
import styles from "./CardScannerScreenStyles";

export function CardScannerScreen(props: ScreenProps) {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState(false);
  const [entity, setEntity] = useState<CardInterface | null>();
  const qrRef = useRef<ViewShot | null>();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

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
    <View style={styles.page}>
      <View style={styles.pageContainer}>
        <Button
          label={"Voltar"}
          accessibilityLabel={"Clique aqui para voltar ao menu principal"}
          callback={() => {
            if (scanned) {
              setScanned(false);
              setEntity(null);
            } else {
              props.navigation.goBack();
            }
          }}
        />
        {scanned && entity ? (
          <View style={styles.cardDataContainer}>
            <Text style={styles.cardDataText}>Nome: {entity.name}</Text>
            <Text style={styles.cardDataText}>
              {cardFrameMap[entity.frameType]
                ? cardFrameMap[entity.frameType]
                : entity.frameType}
            </Text>
            <Text style={styles.cardDataText}>
              Atributo:{" "}
              {cardAttributeMap[entity.attribute]
                ? cardAttributeMap[entity.attribute]
                : entity.attribute}
            </Text>
            <Text style={styles.cardDataText}>
              Tipo:{" "}
              {cardTypeMap[entity.type]
                ? cardTypeMap[entity.type]
                : entity.type}
            </Text>
            {entity.type.includes("Monster") && (
              <Text style={styles.cardDataText}>
                {entity.linkRate
                  ? "Valor link"
                  : entity.frameType === "xyz"
                  ? "Classe"
                  : "Nível"}
                : {entity.linkRate ? entity.linkRate : entity.level}
              </Text>
            )}
            {entity.type.includes("Monster") && (
              <Text style={styles.cardDataText}>{"Ataque: " + entity.atk}</Text>
            )}
            {entity.type.includes("Monster") &&
              !isNaN(entity.def as number) && (
                <Text style={styles.cardDataText}>
                  {"Defesa: " + entity.def}
                </Text>
              )}
            <ViewShot
              ref={(ref) => (qrRef.current = ref)}
              style={styles.qrCodeContainer}
            >
              <QRCode
                value={entity.cardCode}
                size={200}
                color="black"
                backgroundColor="white"
              />
            </ViewShot>
            <Button
              label={"Texto da carta"}
              accessibilityLabel={"Clique aqui para ouvir o texto da carta"}
              callback={() => {
                AccessibilityInfo.announceForAccessibility(entity.description);
              }}
            />
            <Button
              label={"Gerar QR Code"}
              accessibilityLabel={"Clique aqui para gerar o QR Code da carta"}
              aditionalStyles={{ marginBottom: 0 }}
              callback={() => {
                saveQRCodeImage(qrRef.current, entity.name);
              }}
            />
          </View>
        ) : (
          <View style={{ height: 400, width: "100%" }}>
            <Text style={styles.cardDataText}>
              Aponte a câmera para o QR Code da carta
            </Text>
            <CameraView
              style={{ width: "100%", flex: 1 }}
              barcodeScannerSettings={{
                barcodeTypes: ["qr", "pdf417"],
              }}
              onBarcodeScanned={
                scanned
                  ? undefined
                  : ({ type, data }) => {
                      getCardByCode(data as string).then((card) => {
                        AccessibilityInfo.announceForAccessibility(
                          "Carta identificada com sucesso"
                        );
                        setEntity(card);
                        setScanned(true);
                      });
                    }
              }
            />
          </View>
        )}
      </View>
    </View>
  );
}
