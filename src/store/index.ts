import {combineReducers, configureStore} from '@reduxjs/toolkit';
import mineSlice from './slices/mineSlice';

const rootReducer = combineReducers({
    mine: mineSlice
})

const store = configureStore({
    reducer: rootReducer
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

