import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import usersSlice from "./slices/usersSlice";
import messagesSlice from "./slices/messagesSlice";
import persistSlice from "./slices/persistSlice";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["persistInfos"],
};

const rootReducer = combineReducers({
  users: usersSlice,
  messages: messagesSlice,
  persistInfos: persistSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);
export default store;
export { persistor };
