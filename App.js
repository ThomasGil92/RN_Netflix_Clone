import {
  StyleSheet,
  Text,
  Button,
  View,
  StatusBar,
  Image,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./Screens/HomeScreen";
import CatalogScreen from "./Screens/CatalogScreen";
import FavoritesMoviesScreen from "./Screens/FavoritesMoviesScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  /* const CatalogScreen = ({ navigation }) => {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text>Catalog Page</Text>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate("Home")}
        />
      </SafeAreaView>
    );
  }; */
  /* const nav = useNavigation();
  const goToCatalog = () => {
    nav.navigate("Catlog");
  }; */

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          /* headerShown: false, */
          headerTitle: () => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("./assets/img/netflix-logo.png")}
                style={{ height: 30 }}
                resizeMode="contain"
              />
            </View>
          ),

          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTintColor: "red",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 30,
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ route, navigation }) => ({
            headerRight: (props) => (
              <MaterialIcons
                name="local-movies"
                color="white"
                size={30}
                onPress={() => navigation.navigate("Catalog")}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Catalog"
          component={CatalogScreen}
          options={({ route, navigation }) => ({
            headerLeft: (props) => (
              <MaterialIcons
                name="home"
                color="white"
                size={30}
                onPress={() => navigation.navigate("Home")}
              />
            ),
            headerRight: (props) => (
              <MaterialIcons
                name="star-rate"
                color="white"
                size={30}
                onPress={() => navigation.navigate("FavoriteMovies")}
              />
            ),
          })}
        />
        <Stack.Screen
          name="FavoriteMovies"
          component={FavoritesMoviesScreen}
          options={({ route, navigation }) => ({
            headerLeft: (props) => (
              <MaterialIcons
                name="local-movies"
                color="white"
                size={30}
                onPress={() => navigation.navigate("Catalog")}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { /* flex: 1, */ backgroundColor: "#ECF0F1" },
  image: {
    flex: 1,
    height: "100%",
  },
});
