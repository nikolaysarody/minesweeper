import {createSlice, PayloadAction} from '@reduxjs/toolkit';

enum GameStatuses {
    idle,
    begin,
    end
}

enum SmileStatuses {
    smile,
    pressedSmile,
    cool,
    dead,
    scary
}

interface MineState {
    mineCount: number;
    timer: number;
    gameStatus: GameStatuses;
    smileStatus: SmileStatuses
}

const initialState: MineState = {
    mineCount: 0,
    timer: 0,
    gameStatus: 0,
    smileStatus: 0
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