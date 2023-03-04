import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GameStatuses, SmileStatuses} from '../../models/models';

interface MineState {
    count: number;
    timer: number;
    gameStatus: GameStatuses;
    smileStatus: SmileStatuses;
    explodedMineCoordinates: number[],
    flagMinesCoordinates: number[][],
    questionMinesCoordinates: number[][]
}

const initialState: MineState = {
    count: 40,
    timer: 0,
    gameStatus: GameStatuses.Idle,
    smileStatus: SmileStatuses.Smile,
    explodedMineCoordinates: [],
    flagMinesCoordinates: [],
    questionMinesCoordinates: []
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
        },
        updateExplodedMineCoordinates(state, action: PayloadAction<number[]>) {
            state.explodedMineCoordinates = action.payload;
        },
        addFlagMinesCoordinates(state, action: PayloadAction<number[]>) {
            state.flagMinesCoordinates.push(action.payload);
            state.count = state.count - 1;
        },
        removeFlagMinesCoordinates(state, action: PayloadAction<number[]>) {
            state.flagMinesCoordinates.forEach((item, index) => {
                if (item.toString() === action.payload.toString()) {
                    state.flagMinesCoordinates.splice(index, 1);
                }
            })
            state.count = state.count + 1;
        },
        deleteFlagMinesCoordinates(state) {
            state.flagMinesCoordinates = [];
            state.count = 40;
        },
        addQuestionMinesCoordinates(state, action: PayloadAction<number[]>) {
            state.questionMinesCoordinates.push(action.payload);
        },
        removeQuestionMinesCoordinates(state, action: PayloadAction<number[]>) {
            state.questionMinesCoordinates.forEach((item, index) => {
                if (item.toString() === action.payload.toString()) {
                    state.questionMinesCoordinates.splice(index, 1);
                }
            })
        },
        deleteQuestionMinesCoordinates(state) {
            state.questionMinesCoordinates = [];
        }
    },
});

export const {
    updateTimer,
    updateCount,
    updateGameStatus,
    updateSmileStatus,
    updateExplodedMineCoordinates,
    addFlagMinesCoordinates,
    removeFlagMinesCoordinates,
    deleteFlagMinesCoordinates,
    addQuestionMinesCoordinates,
    removeQuestionMinesCoordinates,
    deleteQuestionMinesCoordinates
} = mineSlice.actions;

export default mineSlice.reducer;