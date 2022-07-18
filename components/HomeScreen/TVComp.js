import { useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Image,
} from "react-native";

import { Video } from "expo-av";

export default function TVComp() {
  const video = useRef(null);
  const dimension = useWindowDimensions();
  return (
    <View
      style={{ height: dimension.height - 200, backgroundColor: "#000000" }}
    >
      <View style={styles.separator}></View>
      <View style={styles.column}>
        <View>
          <Text style={styles.firstText}>Regardez Netflix sur votre TV.</Text>
        </View>

        <View style={{ position: "relative" }}>
          <Image
            style={{ height: 350 }}
            resizeMode="contain"
            ref={video}
            source={{
              uri: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png",
            }}
          />
          <Video
            ref={video}
            shouldPlay
            style={styles.video}
            source={{
              uri: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v",
            }}
            useNativeControls={false}
            resizeMode="contain"
            isLooping
          />
        </View>
        <View>
          <Text style={styles.secondText}>
            Regardez Netflix sur votre Smart TV, PlayStation, Xbox, Chromecast,
            Apple TV, lecteurs Blu-ray et bien plus.
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
    justifyContent: "center",
    flex: 1,
  },
  firstText: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  video: {
    height: 200,
    width: 305,
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
