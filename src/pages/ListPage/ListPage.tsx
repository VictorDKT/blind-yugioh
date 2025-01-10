import React, { useEffect, useRef, useState } from "react";
import { PageProps } from "../../types/PageProps";
import {
  Text,
  TouchableOpacity,
  View,
  AccessibilityInfo,
} from "react-native";
import styles from "./ListPageStyles";
import { CardInterface } from "../../types/CardInterface";
import { searchCards } from "../../utils/searchCards";
import { cardTypeMap } from "../../utils/labelMaps";
import { ScrollView } from "react-native-gesture-handler";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import { saveQRCodeImage } from "../../utils/saveQrCodeImage";

export function ListPage(props: PageProps) {
  const [entities, setEntities] = useState<CardInterface[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const qrRefs = useRef<Record<string, any>>({});

  useEffect(() => {
    searchCards({ pageNumber }).then((response) => {
      setEntities(response.data);
      setTotalPages(response.numberOfPages);
    });
  }, [pageNumber]);

  return (
    <ScrollView style={styles.page}>
      <View style={styles.pageContainer}>
        <TouchableOpacity
          style={styles.startButton}
          accessibilityLabel="Clique aqui para voltar ao menu principal"
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <Text style={styles.startButtonText}>Voltar</Text>
        </TouchableOpacity>
        {entities.map((entity) => {
          return (
            <View style={styles.cardDataContainer} key={entity.cardCode}>
              <Text style={styles.cardDataText}>Nome: {entity.name}</Text>
              <Text style={styles.cardDataText}>
                {cardTypeMap[entity.type] ? cardTypeMap[entity.type] : entity.type}
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
                <Text style={styles.cardDataText}>
                  {"Ataque: " + entity.atk}
                </Text>
              )}
              {entity.type.includes("Monster") &&
                entity.frameType !== "link" && (
                  <Text style={styles.cardDataText}>
                    {"Defesa: " + entity.def}
                  </Text>
                )}
              <ViewShot
                ref={(ref) => (qrRefs.current[entity.cardCode] = ref)}
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
                  AccessibilityInfo.announceForAccessibility(
                    entity.description
                  );
                }}
              >
                <Text style={styles.cardButtonText}>Efeito</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.cardButton, marginBottom: 0 }}
                accessibilityLabel="Clique aqui para gerar o QR Code da carta"
                onPress={() => {
                  saveQRCodeImage(qrRefs.current[entity.cardCode], entity.name);
                }}
              >
                <Text style={styles.cardButtonText}>Gerar QR Code</Text>
              </TouchableOpacity>
            </View>
          );
        })}
        <View style={styles.footer}>
          {pageNumber !== 1 ? (
            <TouchableOpacity
              style={styles.pageBackButton}
              accessibilityLabel="Clique aqui para ir para a página anterior da listagem"
              onPress={() => {
                setPageNumber(pageNumber - 1);
              }}
            >
              <Text style={styles.pageButtonText}>Anterior</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ flex: 1 }}></View>
          )}
          <View style={styles.footerPageNumberContainer}>
            <Text
              style={styles.footerPageNumber}
            >{`Página ${pageNumber}`}</Text>
          </View>
          {pageNumber !== totalPages ? (
            <TouchableOpacity
              style={styles.pageNextButton}
              accessibilityLabel="Clique aqui para ir para a próxima página da listagem"
              onPress={() => {
                setPageNumber(pageNumber + 1);
              }}
            >
              <Text style={styles.pageButtonText}>Próxima</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ flex: 1 }}></View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
