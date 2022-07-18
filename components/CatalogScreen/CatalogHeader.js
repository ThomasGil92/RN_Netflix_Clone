import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Image,
  ActivityIndicator,
  FlatList,
  Pressable,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import YoutubePlayer from "react-native-youtube-iframe";
import {
  REACT_APP_IMDB_API_URL,
  REACT_APP_IMDB_API_KEY,
  REACT_APP_IMDB_API_IMG_URL,
} from "@env";
import Modal from "react-native-modal";

import { MaterialIcons } from "@expo/vector-icons";

export default function CatalogHeader() {
  const [trailerUrl, setTrailerUrl] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [infosModalVisible, setInfosModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [genres, setGenres] = useState(null);
  const dimension = useWindowDimensions();

  const getMovies = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_IMDB_API_URL}/discover/movie?with_original_language=en&sort_by=popularity.desc&primary_release_year=2021&language=fr-FR&api_key=${REACT_APP_IMDB_API_KEY}`
      );
      const json = await response.json();
      setData(json.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  async function getAllgenres() {
    try {
      const response = await fetch(
        `${REACT_APP_IMDB_API_URL}/genre/movie/list?api_key=${REACT_APP_IMDB_API_KEY}&language=fr-FR`
      );
      const json = await response.json();
      /*  console.log(json.genres); */
      setGenres(json.genres);
    } catch (error) {
      console.error(error);
    }
  }

  async function getTrailerUrl() {
    const trailers = await fetch(
      `${REACT_APP_IMDB_API_URL}/movie/${data[0].id}/videos?api_key=${REACT_APP_IMDB_API_KEY}`
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

    setTrailerUrl(trailer().key);
  }

  useEffect(() => {
    getAllgenres();
    getMovies();
    getData();
  }, []);

  async function storeData(value) {
    try {
      const jsonValue = JSON.stringify([value]);
      await AsyncStorage.setItem("PERSONAL_MOVIE_LIST", jsonValue);
    } catch (e) {
      console.log(e);
    }
  }

  async function getData() {
    try {
      const jsonValue = await AsyncStorage.getItem("PERSONAL_MOVIE_LIST");

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }

  function getGenresOfThisMovie() {
    const genresToDisplay = [];
    /* console.log("genre", data[0].genre_ids);
    console.log("genres", genres); */
    data[0].genre_ids.map((g) => {
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

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <View style={styles.column}>
        <View style={{ flex: 1 }}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#FE0106" />
          ) : (
            <>
              <View style={{ position: "relative" }}>
                {/* <Text style={{ color: "white" }}>{JSON.stringify(data)}</Text> */}
                <ActivityIndicator
                  size="large"
                  color="#FE0106"
                  style={{
                    zIndex: -1,
                    position: "absolute",
                    top: 150,
                    alignSelf: "center",
                  }}
                />
                <Image
                  source={{
                    uri: `${REACT_APP_IMDB_API_IMG_URL}${data[0].poster_path}`,
                  }}
                  style={{ height: 500 }}
                  resizeMode={"cover"}
                />

                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    position: "absolute",
                    padding: 20,
                    width: "100%",
                    bottom: 0,
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 25,
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {data[0].title} {infosModalVisible ? "true" : "false"}
                  </Text>
                </View>
              </View>
              <View>
                {genres !== null && (
                  <View style={{ alignItems: "center" }}>
                    {getGenresOfThisMovie()}
                  </View>
                )}
              </View>
              <View style={{ marginTop: 15 }}>
                <Modal
                  statusBarTranslucent={true}
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={1}
                    onPressOut={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View
                      style={{
                        height: dimension.height,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 22,
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
                        <TouchableWithoutFeedback>
                          {trailerUrl !== null ? (
                            <View
                              style={{
                                /* height: 200, */
                                width: "100%",
                                /*  height: 400, */
                              }}
                            >
                              <YoutubePlayer
                                style={styles.video}
                                height={250}
                                play
                                videoId={trailerUrl}
                              />
                            </View>
                          ) : (
                            <View>
                              <Text>test</Text>
                            </View>
                          )}
                        </TouchableWithoutFeedback>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Modal>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Pressable onPress={() => storeData(data[0])}>
                    <View style={{ padding: 10, marginRight: 20 }}>
                      <MaterialIcons
                        style={{ textAlign: "center" }}
                        name="add"
                        size={34}
                        color="white"
                      />
                      <Text style={{ color: "grey" }}>Ma liste</Text>
                    </View>
                  </Pressable>
                  <Pressable
                    style={{
                      backgroundColor: "#FFFFFF",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 10,
                    }}
                    onPress={() => {
                      getTrailerUrl();
                      setModalVisible(true);
                    }}
                  >
                    <MaterialIcons
                      name="play-circle-outline"
                      size={24}
                      color="black"
                    />
                    <Text
                      style={{
                        marginLeft: 5,
                        textAlign: "center",
                        fontSize: 20,
                      }}
                    >
                      Lecture
                    </Text>
                  </Pressable>
                  <Modal
                    statusBarTranslucent={true}
                    transparent={true}
                    //animationIn="slide"
                    isVisible={infosModalVisible}
                    onSwipeComplete={() => setInfosModalVisible(false)}
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
                        <Image
                          source={{
                            uri: `${REACT_APP_IMDB_API_IMG_URL}${data[0].backdrop_path}`,
                          }}
                          style={{ height: 250, width: "100%" }}
                          resizeMode={"contain"}
                        />
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
                            {data[0].title}
                          </Text>
                          <Pressable
                            onPress={() => Alert.alert("En développement")}
                          >
                            <View
                              style={{
                                marginHorizontal: 20,
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
                              <Text
                                style={{ color: "grey", textAlign: "center" }}
                              >
                                Me le rappeler
                              </Text>
                            </View>
                          </Pressable>
                          <Pressable
                            onPress={() => Alert.alert("En développement")}
                          >
                            <View
                              style={{
                                marginRight: 20,
                                maxWidth: dimension.width / 4,
                              }}
                            >
                              <MaterialIcons
                                style={{ textAlign: "center" }}
                                name="send"
                                size={34}
                                color="white"
                              />
                              <Text
                                style={{ color: "grey", textAlign: "center" }}
                              >
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
                            {data[0].overview}
                          </Text>
                        </View>
                        {getGenresOfThisMovie()}
                      </View>
                    </View>
                  </Modal>
                  <Pressable
                    style={{ padding: 10, marginLeft: 20 }}
                    onPress={() => {
                      setInfosModalVisible(true);
                    }}
                  >
                    <MaterialIcons
                      style={{ textAlign: "center" }}
                      name="info-outline"
                      size={34}
                      color="white"
                    />
                    <Text style={{ color: "grey" }}>Infos</Text>
                  </Pressable>
                </View>
              </View>
            </>
          )}
        </View>
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
