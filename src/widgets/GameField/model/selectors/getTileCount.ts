import { RootState } from '../../../../app/providers/StoreProvider/config/store';

export const getTileCount = (state: RootState) => state?.game.tileCount;
