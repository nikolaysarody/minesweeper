import { RootState } from '../../../../app/providers/StoreProvider/config/store';

export const getSmileStatus = (state: RootState) => state?.game.smileStatus;
