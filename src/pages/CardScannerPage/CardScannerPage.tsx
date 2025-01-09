import React, { useEffect, useRef, useState } from "react";
import { PageProps } from "../../types/PageProps";
import { AccessibilityInfo, Text, TouchableOpacity, View, Platform  } from "react-native";
import styles from "./CardScannerPageStyles";
import { getCardByCode } from "../../utils/getCardByCode";
import { CardInterface } from "../../types/CardInterface";
import { cardTypeMap } from "../../utils/labelMaps";
import ViewShot from "react-native-view-shot";
import QRCode from "react-native-qrcode-svg";
import { saveQRCodeImage } from "../../utils/saveQrCodeImage";
import { Camera, CameraView } from 'expo-camera';

export function CardScannerPage(props: PageProps) {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState(false);
  const qrRef = useRef<ViewShot | null>();
  const [entity, setEntity] = useState<CardInterface | null>();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const {status} = await await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
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
        <TouchableOpacity
          style={styles.cardButton}
          accessibilityLabel="Clique aqui para permitir que o aplicativo acesse sua câmera"
          onPress={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
          }}
        >
          <Text style={styles.cardButtonText}>Conceder permissão</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <View style={styles.pageContainer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => {
            if(scanned) {
              setScanned(false); 
              setEntity(null);
            } else{
              props.navigation.goBack();
            }
          }}
        >
          <Text style={styles.startButtonText}>Voltar</Text>
        </TouchableOpacity>
        {scanned && entity ? (
          <View style={styles.cardDataContainer} key={entity.cardCode}>
            <Text style={styles.cardDataText}>Nome: {entity.name}</Text>
            <Text style={styles.cardDataText}>
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
            {entity.type.includes("Monster") && entity.frameType !== "link" && (
              <Text style={styles.cardDataText}>{"Defesa: " + entity.def}</Text>
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
            <TouchableOpacity
              style={styles.cardButton}
              accessibilityLabel="Clique aqui para ouvir o texto da carta"
              onPress={() => {
                AccessibilityInfo.announceForAccessibility(entity.description);
              }}
            >
              <Text style={styles.cardButtonText}>Efeito</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.cardButton, marginBottom: 0 }}
              accessibilityLabel="Clique aqui para gerar o QR Code da carta"
              onPress={() => {
                saveQRCodeImage(qrRef.current, entity.name);
              }}
            >
              <Text style={styles.cardButtonText}>Gerar QR Code</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{height: 300, width: "100%"}}>
            <CameraView
              style={{width: '100%', flex: 1}}
              barcodeScannerSettings={{
                barcodeTypes: ["qr", "pdf417"],
              }}
              onBarcodeScanned={scanned ? undefined : ({ type, data })=>{
                getCardByCode(data as string).then((card) => {
                  setEntity(card);
                  setScanned(true);
                });
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
}
