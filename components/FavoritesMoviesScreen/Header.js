import { StyleSheet, View, Text, useWindowDimensions } from "react-native";

export default function Header() {
  return (
    <View style={{ backgroundColor: "#000000" }}>
      <View style={styles.column}>
        <View>
          <Text style={styles.firstText}>Films sauvegardés</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  separator: { height: 10, backgroundColor: "#222222" },
  column: {
    flexDirection: "column",
    justifyContent: "space-around",
    flex: 1,
  },
  firstText: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
});
