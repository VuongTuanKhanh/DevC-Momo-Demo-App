import { StyleSheet } from "react-native";
export default StyleSheet.create({
  filterModalContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  fitlerModal: {
    marginTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10
  },
  rangesContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginVertical: 10,
    flexWrap: "wrap"
  },
  rangeSelect: {
    margin: 5,
    borderColor: "#ddd",
    borderWidth: 2,
    padding: 10
  },
  selected: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF0074"
  },
  textBold: { 
    fontSize: 24, fontWeight: "700" 
  }
});
