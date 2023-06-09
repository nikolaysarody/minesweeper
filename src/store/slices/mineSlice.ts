import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MineState {
    count: number;
    explodedMineCoordinates: number[],
    flagCoordinates: number[][],
    questionCoordinates: number[][],
}

const initialState: MineState = {
    count: 40,
    explodedMineCoordinates: [],
    flagCoordinates: [],
    questionCoordinates: [],
};

const mineSlice = createSlice({
    name: 'mine',
    initialState,
    reducers: {
        updateExplodedMineCoordinates(state, action: PayloadAction<number[]>) {
            state.explodedMineCoordinates = action.payload;
        },
        addFlagMinesCoordinates(state, action: PayloadAction<number[]>) {
            state.flagCoordinates.push(action.payload);
            state.count -= 1;
        },
        removeFlagMinesCoordinates(state, action: PayloadAction<number[]>) {
            state.flagCoordinates.forEach((item, index) => {
                if (item.toString() === action.payload.toString()) {
                    state.flagCoordinates.splice(index, 1);
                }
            });
            state.count += 1;
        },
        deleteFlagMinesCoordinates(state) {
            state.flagCoordinates = [];
            state.count = 40;
        },
        addQuestionMinesCoordinates(state, action: PayloadAction<number[]>) {
            state.questionCoordinates.push(action.payload);
        },
        removeQuestionMinesCoordinates(state, action: PayloadAction<number[]>) {
            state.questionCoordinates.forEach((item, index) => {
                if (item.toString() === action.payload.toString()) {
                    state.questionCoordinates.splice(index, 1);
                }
            });
        },
        deleteQuestionMinesCoordinates(state) {
            state.questionCoordinates = [];
        },
    },
});

export const {
    updateExplodedMineCoordinates,
    addFlagMinesCoordinates,
    removeFlagMinesCoordinates,
    deleteFlagMinesCoordinates,
    addQuestionMinesCoordinates,
    removeQuestionMinesCoordinates,
    deleteQuestionMinesCoordinates,
} = mineSlice.actions;

export default mineSlice.reducer;
