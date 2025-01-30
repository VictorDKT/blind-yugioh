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
import { AccessibleSpinner } from "../../components/LoadSpinner/LoadSpinner";

export function CardScannerScreen(props: ScreenProps) {
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState(false);
  const [entity, setEntity] = useState<CardInterface | null>();
  const qrRef = useRef<ViewShot | null>();
  const [code, setCode] = useState<string | null>();

  useEffect(()=>{
    AccessibilityInfo.announceForAccessibility("Carta escaneada com sucesso. Aguarde enquanto as informações da carta são carregadas.");
    getCardByCode(code as string).then((card) => {
      setEntity(card);
      setScanned(true);
      setCode(null);
      setLoading(false);
      AccessibilityInfo.announceForAccessibility("Os dados da carta foram carregados.");
    });
  }, [code])

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  if(loading) {
    return (
      <View style={{width: "100%", height: "100%", position: "absolute"}}>
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
            {entity.type.includes("Monster") && (
              <Text style={styles.cardDataText}>
                Atributo:{" "}
                {cardAttributeMap[entity.attribute]
                  ? cardAttributeMap[entity.attribute]
                  : entity.attribute}
              </Text>
            )}
            <Text style={styles.cardDataText}>
              Tipo:{" "}
              {cardTypeMap[entity.race]
                ? cardTypeMap[entity.race]
                : entity.race}
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
              customClassName={"smallButton"}
              customTextClassName={"smallButtonText"}
              accessibilityLabel={"Clique aqui para ouvir o texto da carta"}
              callback={() => {
                AccessibilityInfo.announceForAccessibility(entity.description);
              }}
            />
            <Button
              label={"Gerar QR Code"}
              customClassName={"smallButton"}
              customTextClassName={"smallButtonText"}
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
              Aponte a câmera para a parte frontal da carta e aguarde alguns segundos
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
                      setLoading(true);
                      setCode(data);
                    }
              }
            />
          </View>
        )}
      </View>
    </View>
  );
}
