import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GameStatuses, SmileStatuses} from '../../models/models';

interface MineState {
    mineCount: number;
    timer: number;
    gameStatus: GameStatuses;
    smileStatus: SmileStatuses
}

const initialState: MineState = {
    mineCount: 0,
    timer: 0,
    gameStatus: GameStatuses.Idle,
    smileStatus: SmileStatuses.Smile
}

const mineSlice = createSlice({
    name: 'mine',
    initialState,
    reducers: {
        updateCount(state, action: PayloadAction<number>) {
            state.mineCount = action.payload;
        },
        updateGameStatus(state, action: PayloadAction<GameStatuses>) {
            state.gameStatus = action.payload;
        },
        updateSmileStatus(state, action: PayloadAction<SmileStatuses>) {
            state.smileStatus = action.payload;
        }
    },
});

export const {updateCount, updateGameStatus, updateSmileStatus} = mineSlice.actions;

export default mineSlice.reducer;