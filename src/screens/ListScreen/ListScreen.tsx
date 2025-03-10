import React, { useEffect, useRef, useState } from "react";
import { ScreenProps } from "../../types/ScreenProps";
import { Text, View, AccessibilityInfo, ScrollView } from "react-native";
import { CardInterface } from "../../types/CardInterface";
import { searchCards } from "../../utils/searchCards";
import {
  attributeOptions,
  categoryOptions,
  levelOptions,
  scaleOptions,
  typeOptions,
} from "../../utils/consts";
import { Button } from "../../components/Button/Button";
import styles from "./ListScreenStyles";
import { AccessibleTextInput } from "../../components/AccessibleTextInput/AccessibleTextInput";
import { AccessibleSelectInput } from "../../components/AccessibleSelectInput/AccessibleSelectInput";
import { AccessibleSpinner } from "../../components/LoadSpinner/LoadSpinner";
import { CardBox } from "./CardBox/CardBox";

export function ListScreen(props: ScreenProps) {
  const [entities, setEntities] = useState<CardInterface[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Record<string, string | number>>({});
  const [tab, setTab] = useState("list");
  const qrRefs = useRef<Record<string, any>>({});
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    setLoading(true);
    searchCards({ pageNumber, filters }).then((response) => {
      setEntities(response.data);
      setTotalPages(response.numberOfPages);
      setLoading(false);
    });
  }, []);

  return (
    <View style={{width: "100%", height: "100%", position: "absolute"}}>
      {loading && <AccessibleSpinner accessibilityLabel={"As cartas estão sendo carregadas. Por favor, aguarde."} />}
      <ScrollView ref={scrollViewRef} style={styles.page}>
      {tab === "list" ? (
        <View style={styles.pageContainer}>
          <Button
            label={"Voltar"}
            accessibilityLabel="Voltar ao menu principal"
            callback={() => {
              props.navigation.goBack();
            }}
          />
          <Button
            label={"Filtrar"}
            accessibilityLabel="Filtrar cartas por nome ou características"
            callback={() => {
              setTab("filter");
            }}
          />
          {entities.map((entity) => {
            return (
              <CardBox
                entity={entity}
                qrRefs={qrRefs}
              />
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
                  "Ir para a página anterior da listagem"
                }
                callback={() => {
                  searchCards({ pageNumber: pageNumber - 1, filters }).then((response) => {
                    setEntities(response.data);
                    setPageNumber(pageNumber - 1);
                    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
                    setLoading(false);
                    AccessibilityInfo.announceForAccessibility("Página caregada com sucesso")
                  });
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
                  "Ir para a próxima página da listagem"
                }
                callback={() => {
                  searchCards({ pageNumber: pageNumber + 1, filters }).then((response) => {
                    setEntities(response.data);
                    setPageNumber(pageNumber + 1);
                    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
                    setLoading(false);
                    AccessibilityInfo.announceForAccessibility("Página caregada com sucesso")
                  });
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
            accessibilityLabel="Voltar à listagem de cartas"
            callback={() => {
              setTab("list");
            }}
          />
          <Text style={styles.cardDataText}>
            Insira os filtros de busca
          </Text>
          <AccessibleTextInput
            label={"Nome"}
            placeholder={"Insira o nome da carta"}
            acessibilityLabel={"Digite o nome da carta que deseja procurar"}
            defaultValue={filters.name ? filters.name as string : ""}
            callback={(value) => {
              const newFilters = { ...filters };
              newFilters["name"] = value;
              setFilters(newFilters);
            }}
          />
          <AccessibleSelectInput
            label={"Nível, classe ou valor link"}
            placeholder={"Todos os níveis, classes e valores link"}
            accessibilityLabel={
              "Selecione o valor do nivel, classe ou valor link da carta que deseja procurar"
            }
            options={levelOptions}
            defaultValue={filters.level ? filters.level as string : ""}
            callback={(value) => {
              const newFilters = { ...filters };
              newFilters["level"] = value;
              setFilters(newFilters);
            }}
          />
          <AccessibleSelectInput
            label={"Escala pêndulo"}
            placeholder={"Todos as escalas"}
            accessibilityLabel={
              "Selecione o valor da escala pêndulo da carta que deseja procurar"
            }
            options={scaleOptions}
            defaultValue={filters.scale ? filters.scale as string : ""}
            callback={(value) => {
              const newFilters = { ...filters };
              newFilters["scale"] = value;
              setFilters(newFilters);
            }}
          />
          <AccessibleSelectInput
            label={"Categoria"}
            placeholder={"Todas as categorias"}
            accessibilityLabel={
              "Selecione a categoria que deseja procurar"
            }
            options={categoryOptions}
            defaultValue={filters.category ? filters.category as string : ""}
            callback={(value) => {
              const newFilters = { ...filters };
              newFilters["category"] = value;
              setFilters(newFilters);
            }}
          />
          <AccessibleSelectInput
            label={"Atributo"}
            placeholder={"Todos os atributos"}
            accessibilityLabel={
              "Selecione o atributo da carta que deseja procurar"
            }
            options={attributeOptions}
            defaultValue={filters.attribute ? filters.attribute as string : ""}
            callback={(value) => {
              const newFilters = { ...filters };
              newFilters["attribute"] = value;
              setFilters(newFilters);
            }}
          />
          <AccessibleSelectInput
            label={"Tipo"}
            placeholder={"Todos os tipos"}
            accessibilityLabel={"Selecione o tipo da carta que deseja procurar"}
            options={typeOptions}
            defaultValue={filters.type ? filters.type as string : ""}
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
            defaultValue={filters.atk ? filters.atk as string : ""}
            type={"number"}
            callback={(value) => {
              const newFilters = { ...filters };
              newFilters["atk"] = value.toString();
              setFilters(newFilters);
            }}
          />
          <AccessibleTextInput
            label={"Defesa"}
            placeholder={"Insira o valor de defesa"}
            acessibilityLabel={"Digite o defesa da carta que deseja procurar"}
            defaultValue={filters.def ? filters.def as string : ""}
            type={"number"}
            callback={(value) => {
              const newFilters = { ...filters };
              newFilters["def"] = value.toString();
              setFilters(newFilters);
            }}
          />
          <Button
            label={"Filtrar"}
            accessibilityLabel="Salvar filtros e realizar busca"
            callback={() => {
              setLoading(true);
              searchCards({ pageNumber: 1, filters }).then((response) => {
                setEntities(response.data);
                setTotalPages(response.numberOfPages);
                setPageNumber(1);
                scrollViewRef.current?.scrollTo({ y: 0, animated: true });
                setLoading(false);
                AccessibilityInfo.announceForAccessibility("Lista de cartas filtrada com sucesso.");
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
