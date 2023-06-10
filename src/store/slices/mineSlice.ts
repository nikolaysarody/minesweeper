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
        updateExplodedCoordinates(state, action: PayloadAction<number[]>) {
            state.explodedMineCoordinates = action.payload;
        },
        addFlagCoordinates(state, action: PayloadAction<number[]>) {
            state.flagCoordinates.push(action.payload);
            state.count -= 1;
        },
        removeFlagCoordinates(state, action: PayloadAction<number[]>) {
            state.flagCoordinates.forEach((item, index) => {
                if (item.toString() === action.payload.toString()) {
                    state.flagCoordinates.splice(index, 1);
                }
            });
            state.count += 1;
        },
        deleteFlagCoordinates(state) {
            state.flagCoordinates = [];
            state.count = 40;
        },
        addQuestionCoordinates(state, action: PayloadAction<number[]>) {
            state.questionCoordinates.push(action.payload);
        },
        removeQuestionCoordinates(state, action: PayloadAction<number[]>) {
            state.questionCoordinates.forEach((item, index) => {
                if (item.toString() === action.payload.toString()) {
                    state.questionCoordinates.splice(index, 1);
                }
            });
        },
        deleteQuestionCoordinates(state) {
            state.questionCoordinates = [];
        },
    },
});

export const { actions: mineActions } = mineSlice;

export default mineSlice.reducer;
