import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Image,
  Button,
} from "react-native";

export default function TVComp() {
  const dimension = useWindowDimensions();
  return (
    <View
      style={{ height: dimension.height - 200, backgroundColor: "#000000" }}
    >
      <View style={styles.separator}></View>
      <View style={styles.column}>
        <View>
          <Text style={styles.firstText}>
            Téléchargez vos séries préférées pour les regarder hors connexion.
          </Text>
        </View>

        <View style={{ position: "relative", justifyContent: "center" }}>
          <Image
            style={{ height: 315 }}
            resizeMode="contain"
            source={{
              uri: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg",
            }}
          />
          <View style={styles.card}>
            <Image
              style={{ width: 40, height: "100%" }}
              resizeMode="contain"
              source={{
                uri: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png",
              }}
            />
            <View>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Stranger Things
              </Text>
              <Text style={{ color: "#0071EB" }}>
                Téléchargement en cours...
              </Text>
            </View>
            <Image
              style={{ width: 40, height: "100%" }}
              resizeMode="contain"
              source={{
                uri: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/download-icon.gif",
              }}
            />
          </View>
        </View>
        <View>
          <Text style={styles.secondText}>
            Enregistrez vos programmes préférés et ayez toujours quelque chose à
            regarder.
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
    justifyContent: "space-around",
    flex: 1,
  },
  firstText: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  card: {
    padding: 10,
    alignItems: "center",
    height: 80,
    width: 305,
    borderWidth: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#222222",
    backgroundColor: "#000000",
    borderRadius: 15,
    alignSelf: "center",
    position: "absolute",
    bottom: 30,
    zIndex: 2,
  },
  secondText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
});
