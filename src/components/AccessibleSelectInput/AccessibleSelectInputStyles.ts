import { StyleSheet } from "react-native";

const styles: Record<string, Record<string, unknown>> = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginBottom: 10,
  },
  
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },

  input: {
    fontSize: 16,
    color: '#333',
  },

  selectContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default styles;
