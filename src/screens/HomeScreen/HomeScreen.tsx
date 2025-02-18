import React, { useEffect, useState } from "react";
import { ScreenProps } from "../../types/ScreenProps";
import { Text, View } from "react-native";
import { downloadData } from "../../utils/downloadData";
import * as FileSystem from "expo-file-system";
import { Button } from "../../components/Button/Button";
import styles from "./HomeScreenStyles";
import { requestStoragePermission } from "../../utils/requestStoragePermission";

export function HomeScreen(props: ScreenProps) {
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const fileUri = `${FileSystem.documentDirectory}data.json`;

  useEffect(() => {
    (async () => {
      const permissionGranted = await requestStoragePermission();
      setHasPermission(permissionGranted ? true : false);
    })();
  }, []);

  useEffect(() => {
    if(hasPermission) {
      (async function () {
        const fileExists = await FileSystem.getInfoAsync(fileUri);

        if (!fileExists.exists) {
          setLoading(true);
          downloadData().then(() => {
            setLoading(false);
          });
        } else {
          setLoading(false);
          downloadData();
        }
      })();
    }
  }, [hasPermission]);

  return (
    <View style={styles.page}>
      <Text style={styles.pageTitle}>Blind Yu-Gi-Oh!</Text>
      {hasPermission 
        ?
          <View style={{ width: "100%", alignItems: "center" }}>
            {loading ? (
              <Text style={styles.loader}>Carregando...</Text>
            ) : (
              <View style={{ width: "100%", alignItems: "center" }}>
                <Button
                  aditionalStyles={{ fontSize: 20 }}
                  label={"Duelo"}
                  accessibilityLabel={"Ir para a tela de duelo"}
                  callback={() => {
                    props.navigation.navigate("DuelConfigScreen");
                  }}
                />
                <Button
                  aditionalStyles={{ fontSize: 20 }}
                  label={"Listagem de cartas"}
                  accessibilityLabel={"Ir para a tela de listagem de cartas"}
                  callback={() => {
                    props.navigation.navigate("ListScreen");
                  }}
                />
                <Button
                  aditionalStyles={{ fontSize: 20 }}
                  label={"Leitor de cartas"}
                  accessibilityLabel={"Ir para a tela de leitor de cartas"}
                  callback={() => {
                    props.navigation.navigate("CardScannerScreen");
                  }}
                />
              </View>
            )}
          </View>
        :
          <View style={{ width: "100%", alignItems: "center" }}>
            <Text style={styles.loader}>A permissão de acesso aos seus arquivos é necessária para que o aplicativo possa salvar as imagens de QR Code</Text>
            <Button 
              label={"Conceder permissão"}
              accessibilityLabel={"Conceder permissão de acesso aos arquivos no seus dispositivo"}
              callback={async ()=>{
                const permissionGranted = await requestStoragePermission();
                setHasPermission(permissionGranted ? true : false);
              }}
            />
          </View>
      }
    </View>
  );
}
