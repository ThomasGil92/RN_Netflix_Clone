import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import { useState } from "react";
import Accordion from "react-native-collapsible/Accordion";

export default function FAQComp() {
  const [sectionId, setSectionId] = useState([]);
  const dimension = useWindowDimensions();
  const accordionItems = [
    {
      id: 1,
      header: "Netflix, qu'est-ce que c'est ?",
      paragraph: [
        "Netflix est un service de streaming qui propose une vaste sélection de séries TV, films, animes, documentaires et autres programmes primés sur des milliers d'appareils connectés à Internet.",
        "Regardez tout ce que vous voulez, quand vous voulez, sans publicité et à un tarif mensuel très attractif. Découvrez de nouveaux films et séries TV chaque semaine, il y en a pour tous les goûts !",
      ],
    },
    {
      id: 2,
      header: "Combien coûte Netflix ?",
      paragraph: [
        "Regardez Netflix sur votre smartphone, tablette, Smart TV, ordinateur ou appareil de streaming, le tout pour un tarif mensuel fixe. Les forfaits vont de 8,99 € à 17,99 € par mois. Pas de contrat ni de frais supplémentaires.",
      ],
    },
    {
      id: 3,
      header: "Où puis-je regarder Netflix ?",
      paragraph: [
        "Netflix, c'est où vous voulez, quand vous voulez. Connectez-vous à votre compte pour regarder Netflix en ligne sur netflix.com depuis votre ordinateur ou tout appareil connecté à Internet avec l'application Netflix, comme les Smart TV, smartphones, tablettes, lecteurs de streaming et consoles de jeu.",
        "Vous pouvez aussi télécharger vos séries préférées avec l'application iOS, Android ou Windows 10. Téléchargez des titres pour les regarder sur votre appareil mobile, même sans connexion Internet. Emportez Netflix partout avec vous.",
      ],
    },
    {
      id: 4,
      header: "Comment puis-je annuler mon forfait ?",
      paragraph: [
        "Netflix offre une grande souplesse. Pas de contrat compliqué. Sans engagement. Deux clics suffisent pour annuler votre compte en ligne. Pas de frais d'annulation : ouvrez ou fermez votre compte à tout moment.",
      ],
    },
    {
      id: 5,
      header: "Que puis-je regarder sur Netflix ?",
      paragraph: [
        "Netflix propose un vaste catalogue comprenant notamment des longs métrages, des documentaires, des séries TV, des animes et des programmes originaux Netflix primés. Regardez Netflix à volonté, quand vous le voulez.",
      ],
    },
    {
      id: 6,
      header: "Est-ce que Netflix est adapté aux enfants ?",
      paragraph: [
        "Netflix Jeunesse est inclus dans votre abonnement et offre un meilleur contrôle aux parents, ainsi qu'un espace dédié aux enfants, avec des films et des séries destinés à toute la famille.",
        "Les profils Enfants comportent des fonctionnalités de contrôle parental avec code PIN permettant de modifier la catégorie d'âge des contenus que vos enfants peuvent regarder et de bloquer des titres spécifiques.",
      ],
    },
  ];

  function head(section, key) {
    return (
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#303030",
          width: "80%",
          alignSelf: "center",
          padding: 10,
          marginTop: key === 0 ? 0 : 20,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <Text style={styles.titleText}>{section.header}</Text>
      </View>
    );
  }

  function body(section) {
    return (
      <View style={styles.contentView}>
        <Text style={styles.contentText}>{section.paragraph}</Text>
      </View>
    );
  }

  function updateSections(activeSection) {
    setSectionId(activeSection);
  }

  return (
    <View
      style={{ height: dimension.height - 250, backgroundColor: "#000000" }}
    >
      <View style={styles.separator}></View>
      <View style={styles.column}>
        <Accordion
          activeSections={sectionId}
          sections={accordionItems} /* 
          renderSectionTitle={body} */
          renderHeader={head}
          renderContent={body}
          onChange={updateSections}
        />
        {/* <AccordionList
          list={accordionItems}
          header={head}
          body={body}
          keyExtractor={(item) => `${item.id}`}
        /> */}
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

  titleText: { color: "white", fontSize: 25 },
  contentView: {
    backgroundColor: "#303030",
    width: "80%",
    alignSelf: "center",
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  contentText: { textAlign: "center", color: "white", fontSize: 20 },
});
