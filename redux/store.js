import { createStore, combineReducers } from "redux";
import rootReducer from "./reducers";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};
export default configureStore;
