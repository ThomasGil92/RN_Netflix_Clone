import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { useRef } from "react";
import { Video } from "expo-av";

export default function MultiPlatformComp() {
  const video = useRef(null);
  const dimension = useWindowDimensions();
  return (
    <View
      style={{ height: dimension.height - 200, backgroundColor: "#000000" }}
    >
      <View style={styles.separator}></View>
      <View style={styles.column}>
        <View>
          <Text style={styles.firstText}>Où que vous soyez.</Text>
        </View>

        <View style={{ position: "relative" }}>
          <Image
            style={styles.image}
            resizeMode="contain"
            ref={video}
            source={{
              uri: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png",
            }}
          />
          <Video
            ref={video}
            shouldPlay
            style={styles.video}
            source={{
              uri: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v",
            }}
            useNativeControls={false}
            resizeMode="contain"
            isLooping
          />
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
  image: { height: 350 },
  video: {
    height: 150,
    width: 300,
    alignSelf: "stretch",
    position: "absolute",
    top: 70,
    left: 55,
    zIndex: -1,
  },
  secondText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
});
