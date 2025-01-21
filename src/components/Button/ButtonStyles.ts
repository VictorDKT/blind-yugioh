import { StyleSheet } from 'react-native';

const styles: Record<string, Record<string, unknown>> = StyleSheet.create({
    cardButton: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "red",
        width: "100%",
        alignItems: "center",
    },
    
    cardButtonText: {
        fontFamily: "Roboto-Bold",
        fontSize: 15,
        color: "white",
    },
})

export default styles;
