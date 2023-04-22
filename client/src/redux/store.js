// we are using store because we want to use user object in every component so basically 
// we are gonna have a storage and when we want to we will be able to reach the user

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import videoReducer from "./videoSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

// persist is using as when we refresh our page user go and again sign up button appear
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
//
const rootReducer = combineReducers({ user: userReducer, video: videoReducer });
//
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)

/**
storage
-- user
---- currentUser, loading, error   // initial states
 */