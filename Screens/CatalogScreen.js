import { StyleSheet, StatusBar, SafeAreaView, View } from "react-native";
import { ScrollView } from "react-native-virtualized-view";

import CatalogHeader from "../components/CatalogScreen/CatalogHeader";
import RowsCategories from "../components/CatalogScreen/RowsCategories";

export default function CatalogScreen() {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#000000" }]}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          nestedScrollEnabled={true}
        >
          <CatalogHeader />
          <RowsCategories />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ECF0F1" },
});
