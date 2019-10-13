import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "rgba(0,122,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(0,122,255,0.3)",
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    height: 20,
    width: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#007AFF",
    borderWidth: 3,
    borderColor: "white"
  }
});
