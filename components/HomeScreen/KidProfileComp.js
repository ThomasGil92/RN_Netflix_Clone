import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Image,
} from "react-native";

export default function KidProfileComp() {
  const dimension = useWindowDimensions();

  return (
    <View
      style={{ height: dimension.height - 250, backgroundColor: "#000000" }}
    >
      <View style={styles.separator}></View>
      <View style={styles.column}>
        <View style={{ position: "relative" }}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{
              uri: "https://occ-0-769-768.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABZDfkUMdwXcdHIHDS8mqiBYqabgFeaWFN6H5MDy4Sad0uS0CwII4ot9SLFvEiI5URTBm3WolSn9tevH9mWgTI1f2gkJM.png?r=a3e",
            }}
          />
        </View>
        <View>
          <Text style={styles.firstText}>Où que vous soyez.</Text>
        </View>
        <View>
          <Text style={styles.secondText}>
            Regardez des films et séries TV en accès illimité sur votre TV,
            smartphone, tablette et ordinateur, tout compris.
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  separator: { height: 10, backgroundColor: "#222222" },
  column: {
    flexDirection: "column",
    flex: 1,
  },
  image: { height: 350, marginVertical: 30, paddingTop: 50 },
  firstText: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  secondText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 10,
  },
});
