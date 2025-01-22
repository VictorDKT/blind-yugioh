import React, { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Text, View } from "react-native";
import { getCardByCode } from "../../../../utils/getCardByCode";
import { CardInterface } from "../../../../types/CardInterface";
import { cardAttributeMap, cardFrameMap, cardTypeMap } from "../../../../utils/consts";
import ViewShot from "react-native-view-shot";
import { Camera, CameraView } from 'expo-camera';
import { Button } from "../../../../components/Button/Button";
import styles from "./CarTabStyles";

interface CardTab {
    setTab: (value: string)=>void;
}

export function CardTab(props: CardTab) {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState(false);
  const [entity, setEntity] = useState<CardInterface | null>();
  const qrRef = useRef<ViewShot | null>();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await await Camera.requestCameraPermissionsAsync();
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
        <Button
          label={"Conceder permissão"}
          accessibilityLabel={"Clique aqui para permitir que o aplicativo acesse sua câmera"}
          callback={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
          }}
        />
      </View>
    );
  }

  return (
    <View>
        {scanned && entity ? (
          <View style={styles.cardDataContainer} key={entity.cardCode}>
            <Button
                label={"Nome"}
                accessibilityLabel={"Clique aqui para ouvir o nome da carta"}
                callback={() => {
                    AccessibilityInfo.announceForAccessibility(entity.name);
                }}
            />
            <Button
                label={"Características gerais"}
                accessibilityLabel={"Clique aqui para ouvir as características gerais da carta"}
                callback={() => {
                    AccessibilityInfo.announceForAccessibility(cardFrameMap[entity.frameType] ? cardFrameMap[entity.frameType] : entity.frameType);
                }}
            />
           {entity.type.includes("Monster") && ( 
                <Button
                    label={entity.linkRate
                        ? "Valor link"
                        : entity.frameType === "xyz"
                        ? "Classe"
                        : "Nível"}
                    accessibilityLabel={`Clique aqui para ouvir o ${entity.linkRate
                        ? "valor link"
                        : entity.frameType === "xyz"
                        ? "classe"
                        : "nível"} da carta`}
                    callback={() => {
                        AccessibilityInfo.announceForAccessibility(entity.linkRate ? entity.linkRate as string : entity.level as string);
                    }}
                />
            )}
            <Button
              label={"Texto da carta"}
              accessibilityLabel={"Clique aqui para ouvir o texto da carta"}
              callback={() => {
                AccessibilityInfo.announceForAccessibility(entity.description);
              }}
            />
            {entity.type.includes("Monster") && ( 
                <Button
                    label={"Ataque"}
                    accessibilityLabel={"Clique aqui para ouvir o ataque da carta"}
                    callback={() => {
                        AccessibilityInfo.announceForAccessibility(entity.atk.toString());
                    }}
                />
            )}
            {entity.type.includes("Monster") &&  !isNaN(entity.def as number) && ( 
                <Button
                    label={"Defesa"}
                    accessibilityLabel={"Clique aqui para ouvir a defesa da carta"}
                    callback={() => {
                        AccessibilityInfo.announceForAccessibility((entity.def as number).toString());
                    }}
                />
            )}
            <Button
              label={"Atributo"}
              accessibilityLabel={"Clique aqui para ouvir o atributo da carta"}
              callback={() => {
                AccessibilityInfo.announceForAccessibility(cardAttributeMap[entity.attribute] ? cardAttributeMap[entity.attribute] : entity.attribute);
              }}
            />
            <Button
              label={"Tipo"}
              accessibilityLabel={"Clique aqui para ouvir o tipo da carta"}
              callback={() => {
                AccessibilityInfo.announceForAccessibility(cardTypeMap[entity.type] ? cardTypeMap[entity.type] : entity.type);
              }}
            />
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
  );
}
