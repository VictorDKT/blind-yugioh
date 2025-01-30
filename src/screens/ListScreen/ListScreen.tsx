import React, { useEffect, useRef, useState } from "react";
import { ScreenProps } from "../../types/ScreenProps";
import { Text, View, AccessibilityInfo, TextInput } from "react-native";
import { CardInterface } from "../../types/CardInterface";
import { searchCards } from "../../utils/searchCards";
import {
  attributeOptions,
  cardTypeMap,
  levelOptions,
  typeOptions,
} from "../../utils/consts";
import { ScrollView } from "react-native-gesture-handler";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import { saveQRCodeImage } from "../../utils/saveQrCodeImage";
import { Button } from "../../components/Button/Button";
import styles from "./ListScreenStyles";
import { AccessibleTextInput } from "../../components/AccessibleTextInput/AccessibleTextInput";
import { AccessibleSelectInput } from "../../components/AccessibleSelectInput/AccessibleSelectInput";
import { AccessibleSpinner } from "../../components/LoadSpinner/LoadSpinner";

export function ListScreen(props: ScreenProps) {
  const [entities, setEntities] = useState<CardInterface[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Record<string, string | number>>({});
  const [tab, setTab] = useState("list");
  const qrRefs = useRef<Record<string, any>>({});

  useEffect(() => {
    setLoading(true);
    searchCards({ pageNumber, filters }).then((response) => {
      setEntities(response.data);
      setTotalPages(response.numberOfPages);
      setLoading(false);
    });
  }, [pageNumber]);

  return (
    <View style={{width: "100%", height: "100%", position: "absolute"}}>
      {loading && <AccessibleSpinner accessibilityLabel={"As cartas estão sendo carregadas. Por favor, aguarde."} />}
      <ScrollView style={styles.page}>
      {tab === "list" ? (
        <View style={styles.pageContainer}>
          <Button
            label={"Voltar"}
            accessibilityLabel="Clique aqui para voltar ao menu principal"
            callback={() => {
              props.navigation.goBack();
            }}
          />
          <Button
            label={"Filtrar"}
            accessibilityLabel="Clique aqui para adicionar filtros de busca"
            callback={() => {
              setTab("filter");
            }}
          />
          {entities.map((entity) => {
            return (
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
                <Button
                  label={"Efeito"}
                  customClassName={"smallButton"}
                  customTextClassName={"smallButtonText"}
                  accessibilityLabel={"Clique aqui para ouvir o texto da carta"}
                  callback={() => {
                    AccessibilityInfo.announceForAccessibility(
                      entity.description
                    );
                  }}
                />
                <Button
                  label={"Gerar QR Code"}
                  customClassName={"smallButton"}
                  customTextClassName={"smallButtonText"}
                  accessibilityLabel={"Clique aqui para gerar o QR Code da carta"}
                  aditionalStyles={{ marginBottom: 0 }}
                  callback={() => {
                    saveQRCodeImage(
                      qrRefs.current[entity.cardCode],
                      entity.name
                    );
                  }}
                />
              </View>
            );
          })}
          <View style={styles.footer}>
            {pageNumber !== 1 ? (
              <Button
              aditionalStyles={{ flex: 1 }}
                customClassName={"footerButton"}
                customTextClassName={"footerButtonText"}
                label={"Anterior"}
                accessibilityLabel={
                  "Clique aqui para ir para a página anterior da listagem"
                }
                callback={() => {
                  setPageNumber(pageNumber - 1);
                }}
              />
            ) : (
              <View style={{ flex: 1 }}></View>
            )}
            <View style={styles.footerPageNumberContainer}>
              <Text
                style={styles.footerPageNumber}
              >{`Página ${pageNumber}`}</Text>
            </View>
            {pageNumber !== totalPages ? (
              <Button
                aditionalStyles={{ flex: 1 }}
                customClassName={"footerButton"}
                customTextClassName={"footerButtonText"}
                label={"Próxima"}
                accessibilityLabel={
                  "Clique aqui para ir para a próxima página da listagem"
                }
                callback={() => {
                  setPageNumber(pageNumber + 1);
                }}
              />
            ) : (
              <View style={{ flex: 1 }}></View>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.pageContainer}>
          <Button
            label={"Voltar"}
            accessibilityLabel="Clique aqui para voltar à listagem de cartas"
            callback={() => {
              setTab("list");
            }}
          />
          <AccessibleTextInput
            label={"Nome"}
            placeholder={"Insira o nome da carta"}
            acessibilityLabel={"Digite o nome da carta que deseja procurar"}
            defaultValue={filters.name as string}
            callback={(value) => {
              const newFilters = { ...filters };
              newFilters["name"] = value;
              setFilters(newFilters);
            }}
          />
          <AccessibleSelectInput
            label={"Nível/Classe/Valor link"}
            placeholder={"Todos"}
            acessibilityLabel={
              "Selecione o valor do nivel, classe ou valor link da carta que deseja procurar"
            }
            options={levelOptions}
            defaultValue={filters.level as string}
            callback={(value) => {
              const newFilters = { ...filters };
              newFilters["level"] = value;
              setFilters(newFilters);
            }}
          />
          <AccessibleSelectInput
            label={"Atributo"}
            placeholder={"Todos"}
            acessibilityLabel={
              "Selecione o atributo da carta que deseja procurar"
            }
            options={attributeOptions}
            defaultValue={filters.attribute as string}
            callback={(value) => {
              const newFilters = { ...filters };
              newFilters["attribute"] = value;
              setFilters(newFilters);
            }}
          />
          <AccessibleSelectInput
            label={"Tipo"}
            placeholder={"Todos"}
            acessibilityLabel={"Selecione o tipo da carta que deseja procurar"}
            options={typeOptions}
            defaultValue={filters.type as string}
            callback={(value) => {
              const newFilters = { ...filters };
              newFilters["type"] = value;
              setFilters(newFilters);
            }}
          />
          <AccessibleTextInput
            label={"Ataque"}
            placeholder={"Insira o valor de ataque"}
            acessibilityLabel={"Digite o ataque da carta que deseja procurar"}
            defaultValue={filters.atk as string}
            type={"number"}
            callback={(value) => {
              const newFilters = { ...filters };
              newFilters["atk"] = value;
              setFilters(newFilters);
            }}
          />
          <AccessibleTextInput
            label={"Defesa"}
            placeholder={"Insira o valor de defesa"}
            acessibilityLabel={"Digite o defesa da carta que deseja procurar"}
            defaultValue={filters.def as string}
            type={"number"}
            callback={(value) => {
              const newFilters = { ...filters };
              newFilters["def"] = value;
              setFilters(newFilters);
            }}
          />
          <Button
            label={"Filtrar"}
            accessibilityLabel="Clique aqui para salvar os filtros e realizar buscar"
            callback={() => {
              searchCards({ pageNumber, filters }).then((response) => {
                setEntities(response.data);
                setTotalPages(response.numberOfPages);
              });
              setTab("list");
            }}
          />
        </View>
      )}
    </ScrollView>
    </View>
    
  );
}
