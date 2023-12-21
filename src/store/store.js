import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore,persistReducer } from "redux-persist";
import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import { inkartReducer } from "./reducer";

const persistConfig = {
    key:'InkartAdmin',
    storage:AsyncStorage
}

const persistedReducer = persistReducer(persistConfig,inkartReducer)

const store = configureStore({
    reducer:persistedReducer,
    middleware:getDefaultMiddleware=>getDefaultMiddleware({
        immutableCheck:false,
        serializableCheck:false
    })
})

let persister = persistStore(store)

export {store,persister}

