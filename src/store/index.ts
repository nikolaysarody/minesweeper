import { combineReducers, configureStore } from '@reduxjs/toolkit';
import mineSlice from './slices/mineSlice';
import gameSlice from './slices/gameSlice';

const rootReducer = combineReducers({
    mine: mineSlice,
    game: gameSlice,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
