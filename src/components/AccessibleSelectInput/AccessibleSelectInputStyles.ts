import { StyleSheet } from "react-native";

const styles: Record<string, Record<string, unknown>> = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginBottom: 10,
  },
  
  label: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: "Roboto-Bold",
  },

  input: {
    fontSize: 18,
    padding: 0
  },

  selectContainer: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});

export default styles;
