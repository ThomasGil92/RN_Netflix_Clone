import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  useWindowDimensions,
  TextInput,
  Alert,
} from "react-native";

export default function Header() {
  const [inputText, setInputText] = useState("");
  const dimension = useWindowDimensions();

  function createAlert() {
    Alert.alert("Adresse email", `Votre email est : ${inputText} `, [
      {
        text: "Cancel",
        onPress: () => {
          console.log("Cancel Pressed");
          setInputText("");
        },
        style: "destructive",
      },
      {
        text: "OK",
        onPress: () => {
          console.log("OK Pressed");
          setInputText("");
        },
      },
    ]);
  }
  function handleInputText(text) {
    setInputText(text);
  }
  return (
    <ImageBackground
      resizeMode="cover"
      source={{
        uri: "https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/c9165c40-9fd3-42fd-8672-5073004f6582/FR-fr-20220103-popsignuptwoweeks-perspective_alpha_website_large.jpg",
      }}
      style={{ height: dimension.height - 120 }}
    >
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.compTextCard}>
          <Text style={styles.text1}>
            Films, séries TV et bien plus en illimité.
          </Text>
          <Text style={styles.text2}>
            Où que vous soyez. Annulez à tout moment.
          </Text>
          <Text style={styles.text3}>
            Prêt à regarder Netflix ? Saisissez votre adresse e-mail pour vous
            abonner ou réactiver votre abonnement.
          </Text>

          <View style={styles.inputRow}>
            <View style={styles.inputRowFix}>
              <TextInput
                style={styles.textInput}
                onChangeText={handleInputText}
                value={inputText}
                placeholder="Email"
                keyboardType="email-address"
              />
              <TouchableOpacity
                onPress={createAlert}
                title="Commencer"
                color="white"
                style={styles.touchableOpacityButton}
                accessibilityLabel="Commencer à regarder Netflix"
              >
                <Text style={styles.touchableOpacityButtonText}>Commencer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 } /* 
  backgroundImage: { height: dimension.height }, */,
  keyboardAvoidingView: { flex: 1, justifyContent: "center" },
  compTextCard: {
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
  },
  text1: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  text2: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  text3: {
    color: "white",
    fontSize: 20,
    padding: 10,
    marginTop: 10,
    textAlign: "center",
  },
  textInput: {
    height: 40,
    width: "50%",
    borderRadius: 5,
    fontSize: 15,
    backgroundColor: "white",
    padding: 10,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 20,
  },
  inputRowFix: { flexDirection: "row", maxWidth: "80%" },
  touchableOpacityButton: {
    backgroundColor: "#DF0510",
    width: "50%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  touchableOpacityButtonText: { fontSize: 20, color: "white" },
});
