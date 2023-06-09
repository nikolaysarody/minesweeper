import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameStatuses, SmileStatuses } from '../../models/models';

interface GameState {
    timer: number;
    gameStatus: GameStatuses;
    smileStatus: SmileStatuses;
    tileCount: number
}

const initialState: GameState = {
    timer: 0,
    gameStatus: GameStatuses.Idle,
    smileStatus: SmileStatuses.Smile,
    tileCount: 0,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        updateTimer(state, action: PayloadAction<number>) {
            state.timer = action.payload;
        },
        updateGameStatus(state, action: PayloadAction<GameStatuses>) {
            state.gameStatus = action.payload;
        },
        updateSmileStatus(state, action: PayloadAction<SmileStatuses>) {
            state.smileStatus = action.payload;
        },
        updateTileCount(state) {
            state.tileCount += 1;
        },
        deleteTileCount(state) {
            state.tileCount = 0;
        },
    },
});

export const {
    updateTimer, updateGameStatus, updateSmileStatus, updateTileCount, deleteTileCount,
} = gameSlice.actions;

export default gameSlice.reducer;
