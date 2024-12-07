import { configureStore } from "@reduxjs/toolkit";
import authSlice from './AuthSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
    // whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, authSlice)

export const store = configureStore({
    reducer: {
        auth: persistedReducer
    }
})

export const persistor = persistStore(store)