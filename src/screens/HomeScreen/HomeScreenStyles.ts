import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    page: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        padding: 20,
    },

    pageTitle: {
        fontFamily: "Roboto-Bold",
        fontSize: 40,
        marginBottom: 20,
    },

    loader: {
        fontFamily: "Roboto-Bold",
        fontSize: 30,
        marginBottom: 10,
    },

    startButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "red",
        width: "100%",
        marginBottom: 10,
        alignItems: "center",
    },

    startButtonText: {
        fontFamily: "Roboto-Bold",
        fontSize: 20,
        color: "white",
    },
})

export default styles;
