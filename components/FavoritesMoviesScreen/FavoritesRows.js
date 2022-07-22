import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  useWindowDimensions,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { REACT_APP_IMDB_API_IMG_URL } from "@env";

import { useSelector, useDispatch } from "react-redux";

import YoutubePlayer from "react-native-youtube-iframe";

import { MaterialIcons } from "@expo/vector-icons";
import {
  getAllGenres,
  getTrailerUrl,
  clearTrailerUrl,
  getStorage,
  deleteStorageItem,
} from "../../redux/actions";

export default function FavoritesRows() {
  const dimension = useWindowDimensions();
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.allGenres);
  const trailerUrl = useSelector((state) => state.trailerUrl);
  const savedMovies = useSelector((state) => state.savedMovies);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [trailerDisplay, setTrailerDisplay] = useState(false);
  const [loading, setLoading] = useState(true);

  function createAlert() {
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
          onPress: async () => {
            dispatch(deleteStorageItem(selectedItem));

            setModalVisible(false);
          },
        },
      ]
    );
  }

  useEffect(() => {
    /* getStorage(); */
    dispatch(getStorage());
    dispatch(getAllGenres());
    setLoading(false);
  }, []);

  function getGenresOfThisMovie(item) {
    const genresToDisplay = [];
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
          data={savedMovies}
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

  function renderRows() {
    return (
      <View>{renderCategoryRow("Films pour plus tard", savedMovies)}</View>
    );
  }

  return (
    <View>
      <View style={styles.column}>
        <View>
          {savedMovies !== null ? (
            <>
              {renderRows()}
              <Modal
                statusBarTranslucent={true}
                transparent={true}
                //animationIn="slide"
                isVisible={modalVisible}
                onSwipeComplete={() => {
                  setTrailerDisplay(false);
                  dispatch(clearTrailerUrl());
                  setSelectedItem();
                  setModalVisible(false);
                }}
                swipeDirection="down"
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
                            }}
                          >
                            {(trailerUrl != undefined ||
                              trailerUrl != null) && (
                              <YoutubePlayer
                                style={{
                                  width: "100%",
                                }}
                                height={270}
                                play
                                videoId={trailerUrl.key}
                              />
                            )}
                          </View>
                        ) : (
                          <Pressable
                            onPress={() => {
                              dispatch(getTrailerUrl(selectedItem));
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
                              paddingLeft: 10,
                              maxWidth: dimension.width / 2,
                              fontWeight: "bold",
                            }}
                          >
                            {selectedItem.title}
                          </Text>
                          <Pressable
                            /* onPress={createAlert} */ onPress={() =>
                              createAlert()
                            }
                          >
                            <View
                              style={{
                                marginHorizontal: 10,
                                maxWidth: dimension.width / 5,
                              }}
                            >
                              <MaterialIcons
                                style={{ textAlign: "center" }}
                                name="remove"
                                size={34}
                                color="white"
                              />
                              <Text
                                style={{
                                  color: "grey",
                                  textAlign: "center",
                                }}
                              >
                                Enlever
                              </Text>
                            </View>
                          </Pressable>
                          <Pressable
                            onPress={() => Alert.alert("En développement")}
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
                                name="notifications-none"
                                size={34}
                                color="white"
                              />
                              <Text
                                style={{
                                  color: "grey",
                                  textAlign: "center",
                                }}
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
                              <Text
                                style={{
                                  color: "grey",
                                  textAlign: "center",
                                }}
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
                            {selectedItem.overview}
                          </Text>
                        </View>
                        {genres !== undefined &&
                          getGenresOfThisMovie(selectedItem)}
                      </>
                    ) : (
                      <ActivityIndicator size="large" color="#FE0106" />
                    )}
                  </View>
                </View>
              </Modal>
            </>
          ) : loading === false ? (
            <Text style={{ color: "white" }}>Aucun film dans votre liste</Text>
          ) : (
            <ActivityIndicator
              size="large"
              color="#FE0106"
              style={{
                zIndex: -1,
                paddingVertical: 100,
                alignSelf: "center",
              }}
            />
          )}
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
    paddingVertical: 30,
  },
});
