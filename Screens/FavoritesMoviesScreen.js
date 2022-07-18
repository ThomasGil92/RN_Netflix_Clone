import { StyleSheet, StatusBar, SafeAreaView, View } from "react-native";
import { ScrollView } from "react-native-virtualized-view";

import Header from "../components/FavoritesMoviesScreen/Header";
import FavoritesRows from "../components/FavoritesMoviesScreen/FavoritesRows";

export default function FavoritesMoviesScreen() {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#000000" }]}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          nestedScrollEnabled={true}
        >
          <Header />
          <FavoritesRows />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ECF0F1" },
});
