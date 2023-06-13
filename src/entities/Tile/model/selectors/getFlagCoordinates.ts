import { RootState } from '../../../../app/providers/StoreProvider/config/store';

export const getFlagCoordinates = (state: RootState) => state?.mine.flagCoordinates;
