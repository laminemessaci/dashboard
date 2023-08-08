import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage"; // Pour le stockage persistant sur React Native
import postsReducer from "./reducers/reducers.js";

// import { NativeModules } from "react-native";

// if (__DEV__) {
//   NativeModules.DevSettings.setIsDebuggingRemotely(true);
// }

const rootReducer = combineReducers({
  posts: postsReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer:  postsReducer ,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  devTools: true,
});

export const persistor = persistStore(store);
