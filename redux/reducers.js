import { combineReducers } from "redux";
import {
  SET_GENRES,
  SET_TRAILER_URL,
  CLEAR_TRAILER_URL,
  GET_STORAGE,
  GET_BEST_MOVIES_SINCE_2021,
} from "./actions";

const initialState = {};
export function allGenresReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GENRES:
      return action.payload;

    default:
      return state;
  }
}
export function trailerUrlReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TRAILER_URL:
      return action.payload;
    case CLEAR_TRAILER_URL:
      return action.payload;

    default:
      return state;
  }
}
export function savedMoviesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STORAGE:
      return action.payload;

    default:
      return state;
  }
}
export function bestMoviesSince2021Reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BEST_MOVIES_SINCE_2021:
      return action.payload;

    default:
      return state;
  }
}

const reducers = {
  allGenres: allGenresReducer,
  trailerUrl: trailerUrlReducer,
  savedMovies: savedMoviesReducer,
  bestMoviesSince2021: bestMoviesSince2021Reducer,
};

export default combineReducers(reducers);
