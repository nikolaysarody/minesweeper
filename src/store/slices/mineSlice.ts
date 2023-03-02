import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GameStatuses, SmileStatuses} from '../../models/models';

interface MineState {
    count: number;
    timer: number;
    gameStatus: GameStatuses;
    smileStatus: SmileStatuses
}

const initialState: MineState = {
    count: 0,
    timer: 0,
    gameStatus: GameStatuses.Idle,
    smileStatus: SmileStatuses.Smile
}

const mineSlice = createSlice({
    name: 'mine',
    initialState,
    reducers: {
        updateTimer(state, action: PayloadAction<number>) {
            state.timer = action.payload;
        },
        updateCount(state, action: PayloadAction<number>) {
            state.count = action.payload;
        },
        updateGameStatus(state, action: PayloadAction<GameStatuses>) {
            state.gameStatus = action.payload;
        },
        updateSmileStatus(state, action: PayloadAction<SmileStatuses>) {
            state.smileStatus = action.payload;
        }
    },
});

export const {updateTimer, updateCount, updateGameStatus, updateSmileStatus} = mineSlice.actions;

export default mineSlice.reducer;