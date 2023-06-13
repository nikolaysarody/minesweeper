import { RootState } from '../../../../app/providers/StoreProvider/config/store';

export const getQuestionCoordinates = (state: RootState) => state?.mine.questionCoordinates;
