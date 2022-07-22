import { REACT_APP_IMDB_API_URL, REACT_APP_IMDB_API_KEY } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SET_GENRES = "SET_GENRES";
export const SET_TRAILER_URL = "SET_TRAILER_URL";
export const CLEAR_TRAILER_URL = "CLEAR_TRAILER_URL";
export const GET_STORAGE = "GET_STORAGE";
export const GET_BEST_MOVIES_SINCE_2021 = "GET_BEST_MOVIES_SINCE_2021";

export const getAllGenres = () => {
  return async (dispatch) => {
    return axios
      .get(
        `${REACT_APP_IMDB_API_URL}/genre/movie/list?api_key=${REACT_APP_IMDB_API_KEY}&language=fr-FR`
      )
      .then(async (response) => {
        if (response.status === 200) {
          const r = response;
          dispatch({
            type: SET_GENRES,
            payload: r.data.genres,
          });
        }
      });
  };
};

export const getTrailerUrl = (item) => {
  return (dispatch) => {
    return axios
      .get(
        `${REACT_APP_IMDB_API_URL}/movie/${item.id}/videos?api_key=${REACT_APP_IMDB_API_KEY}`
      )
      .then(async (response) => {
        const trailer = () => {
          const t = response.data.results.find((e) =>
            e.name.toLowerCase().includes("official trailer")
          );

          dispatch({
            type: SET_TRAILER_URL,
            payload: t !== undefined ? t : response.data.results[0],
          });
        };
        trailer();
      });
  };
};
export const clearTrailerUrl = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_TRAILER_URL,
      payload: null,
    });
  };
};

export const getStorage = () => {
  return async (dispatch) => {
    const storageList = await AsyncStorage.getItem("PERSONAL_MOVIE_LIST");

    dispatch({
      type: GET_STORAGE,
      payload: storageList != null ? JSON.parse(storageList) : null,
    });
  };
};

export const addStorageItem = (item) => {
  return async (dispatch) => {
    const storageList = await AsyncStorage.getItem("PERSONAL_MOVIE_LIST");

    if (storageList !== null) {
      const newStorageList = JSON.parse(storageList);
      const alreadyHere = newStorageList.filter((sL) => sL.id === item.id);
      if (alreadyHere.length === 0) {
        newStorageList.push(item);
        const jsonValue = JSON.stringify(newStorageList);
        await AsyncStorage.setItem("PERSONAL_MOVIE_LIST", jsonValue);
        dispatch(getStorage());
      }
    } else {
      const jsonValue = JSON.stringify([item]);
      await AsyncStorage.setItem("PERSONAL_MOVIE_LIST", jsonValue);
      dispatch(getStorage());
    }
  };
};
export const deleteStorageItem = (item) => {
  return async (dispatch) => {
    const storageList = await AsyncStorage.getItem("PERSONAL_MOVIE_LIST");
    if (storageList !== null) {
      const newStorageList = JSON.parse(storageList);
      const itemToSupp = newStorageList.filter((sL) => sL.id !== item.id);

      const jsonValue = JSON.stringify(itemToSupp);
      if (itemToSupp.length !== 0) {
        await AsyncStorage.setItem("PERSONAL_MOVIE_LIST", jsonValue);

        dispatch(getStorage());
      } else {
        await AsyncStorage.removeItem("PERSONAL_MOVIE_LIST");

        dispatch(getStorage());
      }
    }
  };
};

export const getBestMoviesSince2021 = () => {
  return (dispatch) => {
    return axios
      .get(
        `${REACT_APP_IMDB_API_URL}/discover/movie?with_original_language=en&sort_by=popularity.desc&primary_release_year=2021&language=fr-FR&api_key=${REACT_APP_IMDB_API_KEY}`
      )
      .then(async (response) => {
        dispatch({
          type: GET_BEST_MOVIES_SINCE_2021,
          payload: response.data.results,
        });
      });
  };
};
