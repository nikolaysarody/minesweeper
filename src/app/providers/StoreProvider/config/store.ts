import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { mineReducer } from '../../../../entities/Tile/model/slice/mineSlice';
import { gameReducer } from '../../../../widgets/GameField/model/slice/gameSlice';

const rootReducer = combineReducers({
    mine: mineReducer,
    game: gameReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
