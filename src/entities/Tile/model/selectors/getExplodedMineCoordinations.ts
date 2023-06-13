import { RootState } from '../../../../app/providers/StoreProvider/config/store';

export const getExplodedMineCoordinates = (state: RootState) => state?.mine.explodedMineCoordinates;
