import { StyleSheet } from 'react-native';

const styles: Record<string, Record<string, unknown>> = StyleSheet.create({
    loader: {
        position: "absolute", 
        zIndex: 3, 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "100%", 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    }
})

export default styles;
