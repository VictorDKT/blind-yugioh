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
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    color: "#333",
    backgroundColor: "#fff",
  },
});

export default styles;
