import React, { useEffect, useState } from 'react';
import { PageProps } from "../../types/PageProps";
import { Text, TouchableOpacity, View } from 'react-native';
import styles from "./HomePageStyles";
import { downloadData } from '../../utils/downloadData';
import { setCardData } from '../../utils/cardDataManager';
import { CardInterface } from '../../types/CardInterface';
import * as FileSystem from 'expo-file-system';
const fileUri = `${FileSystem.documentDirectory}data.json`;

export function HomePage(props: PageProps) {
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        (async function () {
            const fileExists = await FileSystem.getInfoAsync(fileUri);

            if (!fileExists.exists) {
                setLoading(true);
                downloadData().then(response=>{
                    setCardData(response as CardInterface[])
                    setLoading(false);
                });
            } else {
                setLoading(false);
                downloadData().then(response=>{
                    setCardData(response as CardInterface[])
                });
            }
        })()
    }, [])

    return (
        <View style={styles.page}>
            <Text style={styles.pageTitle}>Blind Yugioh</Text>
            {loading ? 
                    <Text style={styles.loader}>Carregando...</Text>
                : 
                    <View style={{width: "100%"}}>
                        <TouchableOpacity 
                            style={styles.startButton}
                            accessibilityLabel="Clique aqui para ir para a lista de cartas"
                            onPress={()=>{
                                props.navigation.navigate("ListPage");
                            }}
                        >
                            <Text style={styles.startButtonText}>Lista de cartas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.startButton}
                            accessibilityLabel="Clique aqui para ir para o scanner de cartas"
                            onPress={()=>{
                                props.navigation.navigate("CardScannerPage");
                            }}
                        >
                            <Text style={styles.startButtonText}>Leitor de cartas</Text>
                        </TouchableOpacity>
                    </View>
            }
        </View>
    )
}
