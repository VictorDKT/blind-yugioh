import { StyleSheet } from 'react-native';

const styles: Record<string, Record<string, unknown>> = StyleSheet.create({
    cardButton: {
        marginBottom: 15,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "red",
        width: "100%",
        alignItems: "center",
    },
    
    cardButtonText: {
        fontFamily: "Roboto-Bold",
        fontSize: 25,
        color: "white",
    },
})

export default styles;
