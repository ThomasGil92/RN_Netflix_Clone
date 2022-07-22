import React, { useState, useEffect, useRef } from "react";
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
  Animated,
  Share,
  TouchableWithoutFeedback,
} from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import YoutubePlayer from "react-native-youtube-iframe";
import { REACT_APP_IMDB_API_IMG_URL } from "@env";
import Modal from "react-native-modal";

import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import {
  clearTrailerUrl,
  addStorageItem,
  deleteStorageItem,
  getAllGenres,
  getBestMoviesSince2021,
  getStorage,
  getTrailerUrl,
} from "../../redux/actions";

export default function CatalogHeader() {
  const dispatch = useDispatch();
  const bestMoviesSince2021 = useSelector((state) => state.bestMoviesSince2021);
  const genres = useSelector((state) => state.allGenres);
  const trailerUrl = useSelector((state) => state.trailerUrl);
  const savedMovies = useSelector((state) => state.savedMovies);

  const [modalVisible, setModalVisible] = useState(false);
  const [infosModalVisible, setInfosModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const dimension = useWindowDimensions();

  //Share options, cannot test on simulator
  /* const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
        url: "https://reactnative.dev/docs/share",
        title: "React Native shared link",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }; */

  const fadeAnimDelete = useRef(new Animated.Value(0)).current;
  const fadeAnimAdd = useRef(new Animated.Value(0)).current;
  const fadeInDelete = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnimDelete, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const fadeOutDelete = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnimDelete, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };
  const fadeInAdd = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnimAdd, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const fadeOutAdd = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnimAdd, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };
  //Notifications Push, cannot test on simulator
  /* Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
    }),
  });
  async function registerForPushNotificationsAsync() {
    let token;

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);

    return token;
  } */

  useEffect(() => {
    /* registerForPushNotificationsAsync(); */

    dispatch(getAllGenres());
    dispatch(getBestMoviesSince2021());
    dispatch(getStorage());
    getData(); /* 
    getStorageList(); */
    setLoading(false);
  }, []);

  function isInTheFavList(item) {
    console.log("sss", savedMovies);
    if (savedMovies !== null || savedMovies != undefined) {
      const newSavedMovies = savedMovies;
      const alreadyHere = newSavedMovies.filter((sL) => sL.id === item.id);
      if (alreadyHere.length !== 0) {
        fadeOutAdd();
        fadeInDelete();
        return true;
      } else {
        fadeOutDelete();
        fadeInAdd();
        return false;
      }
    } else {
      fadeInAdd();
      return false;
    }
  }

  async function getData() {
    try {
      const jsonValue = await AsyncStorage.getItem("PERSONAL_MOVIE_LIST");

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  }

  function getGenresOfThisMovie() {
    const genresToDisplay = [];

    bestMoviesSince2021[0].genre_ids.map((g) => {
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
                  <View></View>
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
          {!bestMoviesSince2021[0] ? (
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
                    uri: `${REACT_APP_IMDB_API_IMG_URL}${bestMoviesSince2021[0].poster_path}`,
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
                    {bestMoviesSince2021[0].title}
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
                          {trailerUrl != null && (
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
                                videoId={trailerUrl.key}
                              />
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
                  {isInTheFavList(bestMoviesSince2021[0]) ? (
                    <Animated.View style={{ opacity: fadeAnimDelete }}>
                      <Pressable
                        //style={{ opacity: fadeAnim }}
                        onPress={() => {
                          return Alert.alert(
                            `Voulez-vous supprimer "${bestMoviesSince2021[0].title}" de votre liste?`,
                            "",
                            [
                              {
                                text: "Annuler",
                                style: "destructive",
                              },
                              {
                                text: "Oui",
                                onPress: () => {
                                  dispatch(
                                    deleteStorageItem(bestMoviesSince2021[0])
                                  );
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
                    </Animated.View>
                  ) : (
                    <Animated.View style={{ opacity: fadeAnimAdd }}>
                      <Pressable
                        onPress={() => {
                          console.log("test");
                          dispatch(addStorageItem(bestMoviesSince2021[0]));
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
                    </Animated.View>
                  )}
                  <Pressable
                    style={{
                      backgroundColor: "#FFFFFF",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 10,
                    }}
                    onPress={() => {
                      dispatch(getTrailerUrl(bestMoviesSince2021[0]));

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
                    isVisible={infosModalVisible}
                    onSwipeComplete={() => {
                      dispatch(clearTrailerUrl()), setInfosModalVisible(false);
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
                        <Image
                          source={{
                            uri: `${REACT_APP_IMDB_API_IMG_URL}${bestMoviesSince2021[0].backdrop_path}`,
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
                            {bestMoviesSince2021[0].title}
                          </Text>
                          <Pressable
                            onPress={() =>
                              Alert.alert("Indisponible dans le simulateur IOS")
                            }
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
                            onPress={
                              /* onShare  */ () =>
                                Alert.alert(
                                  "Indisponible dans le simulateur IOS"
                                )
                            }
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
                            {bestMoviesSince2021[0].overview}
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
