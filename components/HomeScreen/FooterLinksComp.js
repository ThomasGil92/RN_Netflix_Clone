import {
  StyleSheet,
  View,
  FlatList,
  Item,
  ScrollView,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function FooterLinksComp() {
  const dimension = useWindowDimensions();

  const footerLink = [
    "FAQ",
    "Centre d'aide",
    "Compte",
    "Presse",
    "Relations Investisseurs",
    "Recrutement",
    "Utiliser des cartes cadeaux",
    "Acheter des cartes cadeaux",
    "Modes de lecture",
    "Conditions d'utilisation",
    "Confidentialité",
    "Préférences de cookies",
    "Mentions légales",
    "Nous contacter",
    "Test de vitesse",
    "Informations légales",
    "Seulement sur Netflix",
  ];
  function createAlert() {
    Alert.alert("Aucun effet", `Ces liens ne fonctionnent pas haha `, [
      {
        text: "Cancel",
        onPress: () => {},
        style: "destructive",
      },
      {
        text: "OK",
        onPress: () => {},
      },
    ]);
  }
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          justifyContent: "center",
          padding: 5,
          width: "40%",
        }}
      >
        <TouchableOpacity onPress={createAlert} title={item}>
          <Text
            style={{
              color: "#6C757D",
              textAlign: "left",
              fontSize: 18,
            }}
          >
            {item}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <View style={styles.separator}></View>
      <View style={styles.column}>
        <FlatList
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginHorizontal: 40,
          }}
          data={footerLink}
          renderItem={renderItem}
          keyExtractor={(item, id) => id}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  separator: { height: 10, backgroundColor: "#222222" },
  column: {
    paddingVertical: 50,
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },
});
