import { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Animated,
  Image,
  ActivityIndicator,
  FlatList,
  Pressable,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import YoutubePlayer from "react-native-youtube-iframe";

import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";

import {
  REACT_APP_IMDB_API_URL,
  REACT_APP_IMDB_API_KEY,
  REACT_APP_IMDB_API_IMG_URL,
} from "@env";

export default function RowsCategories() {
  const dimension = useWindowDimensions();
  const [trailerDisplay, setTrailerDisplay] = useState(false);
  const [trailerId, setTrailerId] = useState();
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState();
  const [netflixMovies, setNetflixMovies] = useState();
  const [bestMovies, setBestMovies] = useState();
  const [actionMovies, setActionMovies] = useState();
  const [animationMovies, setAnimationMovies] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [storageList, setStorageList] = useState(null);

  async function getAllgenres() {
    try {
      const response = await fetch(
        `${REACT_APP_IMDB_API_URL}/genre/movie/list?api_key=${REACT_APP_IMDB_API_KEY}&language=fr-FR`
      );
      const json = await response.json();
      setGenres(json.genres);
    } catch (error) {
      console.error(error);
    }
  }

  const getNetflixMovies = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_IMDB_API_URL}/discover/movie?with_original_language=en&with_watch_providers=8&watch_region=FR&primary_release_year=2021&sort_by=popularity.desc&language=fr-FR&api_key=${REACT_APP_IMDB_API_KEY}`
      );
      const json = await response.json();
      setNetflixMovies(json.results);
    } catch (error) {
      console.error(error);
    }
  };
  const getBestMovies = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_IMDB_API_URL}/discover/movie?with_original_language=en&sort_by=popularity.desc&primary_release_year=2021&language=fr-FR&api_key=${REACT_APP_IMDB_API_KEY}`
      );
      const json = await response.json();
      setBestMovies(json.results);
    } catch (error) {
      console.error(error);
    }
  };
  const getActionMovies = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_IMDB_API_URL}/discover/movie?with_original_language=en&primary_release_year=2021&sort_by=vote_average.desc&with_genres=28&sort_by=vote_average.desc&vote_count.gte=10&language=fr-FR&api_key=${REACT_APP_IMDB_API_KEY}`
      );
      const json = await response.json();
      setActionMovies(json.results);
    } catch (error) {
      console.error(error);
    }
  };
  const getAnimationMovies = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_IMDB_API_URL}/discover/movie?with_original_language=en&primary_release_year=2021&sort_by=vote_average.desc&with_genres=16&sort_by=vote_average.desc&vote_count.gte=10&language=fr-FR&api_key=${REACT_APP_IMDB_API_KEY}`
      );
      const json = await response.json();
      setAnimationMovies(json.results);
    } catch (error) {
      console.error(error);
    }
  };

  async function getTrailerUrl(item) {
    const trailers = await fetch(
      `${REACT_APP_IMDB_API_URL}/movie/${item.id}/videos?api_key=${REACT_APP_IMDB_API_KEY}`
    )
      .then(function (response) {
        return response.text();
      })
      .then(function (text) {
        let outcome = JSON.parse(text);

        return outcome;
      });
    const trailer = () => {
      const t = trailers.results.find((e) =>
        e.name.toLowerCase().includes("official trailer")
      );
      return t !== undefined ? t : trailers.results[0];
    };
    setTrailerId(trailer().key);
  }
  const getStorageList = async () => {
    const storageListInit = await AsyncStorage.getItem("PERSONAL_MOVIE_LIST");
    setStorageList(storageListInit);
  };
  useEffect(() => {
    getAllgenres();
    getNetflixMovies();
    getBestMovies();
    getActionMovies();
    getAnimationMovies();

    getStorageList();
    setLoading(false);
  }, []);

  useEffect(() => {
    getStorageList();
  }, [addToFavoriteList, removeFromFavoriteList]);

  function isInTheFavList(item) {
    if (storageList !== null || storageList !== undefined) {
      const newStorageList = JSON.parse(storageList);
      const alreadyHere = newStorageList.filter((sL) => sL.id === item.id);
      if (alreadyHere.length !== 0) {
        return true;
      } else {
        return false;
      }
    }
    // return storageList != null ? JSON.parse(jsonValue) : null;
    /* const jsonValue = JSON.stringify([value]);
      await AsyncStorage.setItem("PERSONAL_MOVIE_LIST", jsonValue); */
  }

  async function addToFavoriteList(value) {
    try {
      const storageList = await AsyncStorage.getItem("PERSONAL_MOVIE_LIST");

      if (storageList !== null) {
        const newStorageList = JSON.parse(storageList);
        const alreadyHere = newStorageList.filter((sL) => sL.id === value.id);
        if (alreadyHere.length === 0) {
          newStorageList.push(value);
          const jsonValue = JSON.stringify(newStorageList);
          await AsyncStorage.setItem("PERSONAL_MOVIE_LIST", jsonValue);
          getStorageList();
        }
      } else {
        const jsonValue = JSON.stringify([value]);
        await AsyncStorage.setItem("PERSONAL_MOVIE_LIST", jsonValue);
        getStorageList();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function removeFromFavoriteList(item) {
    try {
      if (storageList !== null) {
        const newStorageList = JSON.parse(storageList);
        const itemToSupp = newStorageList.filter((sL) => sL.id !== item.id);

        const jsonValue = JSON.stringify(itemToSupp);
        await AsyncStorage.setItem("PERSONAL_MOVIE_LIST", jsonValue);
        getStorageList();
      }
    } catch (e) {
      console.log(e);
    }
  }

  function getDataByGenre(genreId) {
    switch (genreId) {
      case null:
        return bestMovies;
      case "netflix":
        return netflixMovies;
      case 28:
        return actionMovies;
      case 16:
        return animationMovies;
      default:
        console.log(`Sorry, we are out of ${expr}.`);
    }
  }

  function getGenresOfThisMovie(item) {
    const genresToDisplay = [];
    /* console.log("genre", data[0].genre_ids);
    console.log("genres", genres); */
    item.genre_ids.map((g) => {
      const filteredG = genres.filter((fG) => fG.id === g);
      genresToDisplay.push(filteredG[0].name);
    });
    return (
      <View
        style={{
          width: "80%",
          alignItems: "center",
        }}
      >
        <FlatList
          horizontal
          data={genresToDisplay}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => {
            return (
              <>
                {index !== 0 ? (
                  <View
                    style={{
                      justifyContent: "flex-end",
                      paddingBottom: 5,
                    }}
                  >
                    <View
                      style={{
                        width: 5,
                        height: 5,
                        backgroundColor: "red",
                        borderRadius: "50%",
                      }}
                    />
                  </View>
                ) : (
                  <Text>{/* {JSON.stringify(item)} */}</Text>
                )}
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    marginTop: 10,
                    marginHorizontal: 10,
                  }}
                >
                  {item}
                </Text>
              </>
            );
          }}
        />
      </View>
    );
  }

  function renderCategoryRow(title, genreId) {
    return (
      <>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 15,
            marginBottom: 10,
          }}
        >
          {title}
        </Text>
        <FlatList
          horizontal
          style={{ marginBottom: 30 }}
          data={getDataByGenre(genreId)}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => {
            return (
              <>
                <Pressable
                  onPress={() => {
                    setSelectedItem(item);
                    setModalVisible(true);
                  }}
                >
                  <View
                    style={{
                      width: dimension.width / 3.3,
                      height: 200,
                      marginRight: 5,
                      position: "relative",
                    }}
                  >
                    <ActivityIndicator
                      size="large"
                      color="#FE0106"
                      style={{
                        zIndex: -1,
                        position: "absolute",
                        top: 100,
                        alignSelf: "center",
                      }}
                    />
                    <Image
                      source={{
                        uri: `${REACT_APP_IMDB_API_IMG_URL}${item.poster_path}`,
                      }}
                      style={{ height: "100%" }}
                      resizeMode={"cover"}
                    />
                  </View>
                </Pressable>
              </>
            );
          }}
        />
      </>
    );
  }

  const FadeInView = (props) => {
    const fadeAnim = new Animated.ValueXY({ x: -100, y: -100 }); // Initial value for opacity: 0
    Animated.spring(fadeAnim, {
      useNativeDriver: true,
      toValue: { x: -100, y: 5 - 100 },
      duration: 5000,
    }).start();
    /* useEffect(() => {
      Animated.spring(fadeAnim, {
        useNativeDriver: true,
        toValue: { x: 225, y: 575 },
      }).start();
    }, []); */

    return (
      <Animated.View // Special animatable View
      >
        <Text style={{ color: "white" }}>test</Text>
      </Animated.View>
    );
  };

  function renderRows() {
    return (
      <View>
        {renderCategoryRow("Meilleurs films", null)}
        {renderCategoryRow("Meilleurs films Netflix", "netflix")}
        {renderCategoryRow("Meilleurs films d'action", 28)}
        {renderCategoryRow("Meilleurs films d'animation", 16)}
      </View>
    );
  }

  return (
    <View style={{ marginTop: 30, backgroundColor: "#000000" }}>
      <View style={styles.column}>
        {renderRows()}
        <Modal
          statusBarTranslucent={true}
          transparent={true}
          //animationIn="slide"
          isVisible={modalVisible}
          onSwipeComplete={() => {
            setTrailerDisplay(false);
            setTrailerId();
            setSelectedItem();
            setModalVisible(false);
          }}
          swipeDirection="down"

          /* onRequestClose={() => {
                      setInfosModalVisible(!infosModalVisible);
                    }} */
        >
          <View
            style={{
              flex: 1,
              height: dimension.height,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: dimension.height - 30,
                width: dimension.width,
                backgroundColor: "rgba(0,0,0,0.7)",
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <View
                style={{
                  height: 5,
                  backgroundColor: "grey",
                  width: "50%",
                  borderRadius: 4,
                  marginBottom: 50,
                }}
              />
              {selectedItem !== undefined ? (
                <>
                  {trailerDisplay ? (
                    <View
                      style={{
                        height: 270,
                        width: "100%",
                        /*  height: 400, */
                      }}
                    >
                      {(trailerId !== undefined || trailerId !== null) && (
                        <YoutubePlayer
                          style={{
                            width: "100%",
                          }}
                          height={270}
                          play
                          videoId={trailerId}
                        />
                      )}
                    </View>
                  ) : (
                    <Pressable
                      onPress={() => {
                        getTrailerUrl(selectedItem);
                        setTrailerDisplay(true);
                      }}
                      style={{
                        height: 270,
                        width: "100%",
                        position: "relative",
                      }}
                    >
                      <Image
                        source={{
                          uri: `${REACT_APP_IMDB_API_IMG_URL}${selectedItem.backdrop_path}`,
                        }}
                        style={{ height: "100%", width: "100%" }}
                        resizeMode={"cover"}
                      />
                      <View
                        style={{
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          justifyContent: "center",
                          alignItems: "center",
                          position: "absolute",
                        }}
                      >
                        <MaterialIcons
                          name="play-circle-outline"
                          size={34}
                          color="white"
                        />
                      </View>
                    </Pressable>
                  )}

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: dimension.width,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 25,
                        paddingHorizontal: 10,
                        maxWidth: dimension.width / 2,
                        fontWeight: "bold",
                      }}
                    >
                      {selectedItem.title}
                    </Text>
                    {isInTheFavList(selectedItem) ? (
                      <Pressable
                        onPress={() => {
                          return Alert.alert(
                            `Voulez-vous supprimer "${selectedItem.title}" de votre liste?`,
                            "",
                            [
                              {
                                text: "Annuler",
                                style: "destructive",
                              },
                              {
                                text: "Oui",
                                onPress: () => {
                                  removeFromFavoriteList(selectedItem);
                                },
                              },
                            ]
                          );
                        }}
                      >
                        <View
                          style={{
                            marginHorizontal: 10,
                            paddingTop: 15,
                            maxWidth: dimension.width / 5,
                          }}
                        >
                          <MaterialIcons
                            style={{ textAlign: "center" }}
                            name="remove"
                            size={34}
                            color="white"
                          />
                          <Text style={{ color: "grey", textAlign: "center" }}>
                            Ma liste
                          </Text>
                        </View>
                      </Pressable>
                    ) : (
                      <Pressable
                        onPress={() => {
                          addToFavoriteList(selectedItem);
                        }}
                      >
                        <View
                          style={{
                            marginHorizontal: 10,
                            paddingTop: 15,
                            maxWidth: dimension.width / 5,
                          }}
                        >
                          <MaterialIcons
                            style={{ textAlign: "center" }}
                            name="add"
                            size={34}
                            color="white"
                          />
                          <Text style={{ color: "grey", textAlign: "center" }}>
                            Ma liste
                          </Text>
                        </View>
                      </Pressable>
                    )}

                    <Pressable onPress={() => Alert.alert("En développement")}>
                      <View
                        style={{
                          marginHorizontal: 10,
                          paddingTop: 15,
                          maxWidth: dimension.width / 5,
                        }}
                      >
                        <MaterialIcons
                          style={{ textAlign: "center" }}
                          name="notifications-none"
                          size={34}
                          color="white"
                        />
                        <Text style={{ color: "grey", textAlign: "center" }}>
                          Me le rappeler
                        </Text>
                      </View>
                    </Pressable>
                    <Pressable onPress={() => Alert.alert("En développement")}>
                      <View
                        style={{
                          marginRight: 10,
                          maxWidth: dimension.width / 4,
                        }}
                      >
                        <MaterialIcons
                          style={{ textAlign: "center" }}
                          name="send"
                          size={34}
                          color="white"
                        />
                        <Text style={{ color: "grey", textAlign: "center" }}>
                          Partager
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                  <View style={{ padding: 20 }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "white",
                        marginBottom: 10,
                      }}
                    >
                      Synopsis:
                    </Text>
                    <Text style={{ color: "white", padding: 10 }}>
                      {selectedItem.overview}
                    </Text>
                  </View>
                  {getGenresOfThisMovie(selectedItem)}
                </>
              ) : (
                <ActivityIndicator size="large" color="#FE0106" />
              )}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
    flex: 1,
  },
});
