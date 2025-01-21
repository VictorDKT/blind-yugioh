import { StyleSheet } from "react-native";

const styles: Record<string, Record<string, unknown>> = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: "#333",
    backgroundColor: "#fff",
  },
});

export default styles;
