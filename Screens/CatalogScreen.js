import { StyleSheet, StatusBar, SafeAreaView, View } from "react-native";
import { ScrollView, Text } from "react-native-virtualized-view";

import CatalogHeader from "../components/CatalogScreen/CatalogHeader";
import RowsCategories from "../components/CatalogScreen/RowsCategories";
import Header from "../components/HomeScreen/Header";
import TVComp from "../components/HomeScreen/TVComp";
import DownloadComp from "../components/HomeScreen/DownloadComp";
import MultiPlatformComp from "../components/HomeScreen/MultiPlatformComp";
import KidProfileComp from "../components/HomeScreen/KidProfileComp";
import FAQComp from "../components/HomeScreen/FAQComp";
import FooterLinksComp from "../components/HomeScreen/FooterLinksComp";

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
          {/* <Header />
          <TVComp />
          <DownloadComp />
          <MultiPlatformComp />
          <KidProfileComp />
          <FAQComp />
          <FooterLinksComp /> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ECF0F1" },
});
