import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    page: {
        width: "100%",
        height: "100%",
        
    },

    pageContainer: {
        width: "100%",
        padding: 20,
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

    footer: {
        flexDirection: "row",
        width: "100%",
    },

    footerPageNumber: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "Roboto-Bold",
        fontSize: 15,
    },

    footerPageNumberContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    pageBackButton: {
        flex: 1,
        marginRight: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "red",
        width: "100%",
        alignItems: "center",
    },
    
    pageNextButton: {
        flex: 1,
        marginLeft: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "red",
        width: "100%",
        alignItems: "center",
    },

    pageButtonText: {
        fontFamily: "Roboto-Bold",
        fontSize: 15,
        color: "white",
    },

    cardDataContainer: {
        padding: 15,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 10,
        marginBottom: 10,
    },

    cardDataText: {
        fontFamily: "Roboto-Bold",
        fontSize: 20,
        marginBottom: 5,
        color: "black",
    },

    cardAttributesContainer: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },

    cardButtonsContainer: {
        marginTop: 10,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly",
    },

    cardButton: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "blue",
        width: "100%",
        alignItems: "center",
    },

    cardButtonText: {
        fontFamily: "Roboto-Bold",
        fontSize: 15,
        color: "white",
    },

    qrCodeContainer: {
        position: "absolute",
        top: 0,
        right: -500,
        padding: 10,
        backgroundColor: "white",
    },
})

export default styles;
